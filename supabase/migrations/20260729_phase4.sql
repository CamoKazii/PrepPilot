create table if not exists public.user_records(
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  record_id text not null,
  collection text not null,
  record_key text not null,
  version integer not null check(version>0),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key(user_id,record_id)
);
create index if not exists user_records_collection_idx on public.user_records(user_id,collection);
alter table public.user_records enable row level security;
create policy "users read own records" on public.user_records for select using(auth.uid()=user_id);
create policy "users insert own records" on public.user_records for insert with check(auth.uid()=user_id);
create policy "users update own records" on public.user_records for update using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "users delete own records" on public.user_records for delete using(auth.uid()=user_id);

create or replace function public.apply_user_record(
  p_record_id text,
  p_collection text,
  p_record_key text,
  p_version integer,
  p_base_version integer,
  p_payload jsonb,
  p_updated_at timestamptz,
  p_deleted_at timestamptz
) returns jsonb
language plpgsql
security invoker
set search_path=public
as $$
declare current_row public.user_records%rowtype;
begin
  select * into current_row from public.user_records where user_id=auth.uid() and record_id=p_record_id for update;
  if not found then
    if p_base_version<>0 then return jsonb_build_object('status','conflict','current',null); end if;
    insert into public.user_records(user_id,record_id,collection,record_key,version,payload,updated_at,deleted_at)
    values(auth.uid(),p_record_id,p_collection,p_record_key,p_version,p_payload,p_updated_at,p_deleted_at);
    return jsonb_build_object('status','applied','version',p_version);
  end if;
  if current_row.version<>p_base_version then
    return jsonb_build_object('status','conflict','current',to_jsonb(current_row));
  end if;
  update public.user_records set collection=p_collection,record_key=p_record_key,version=p_version,payload=p_payload,updated_at=p_updated_at,deleted_at=p_deleted_at
  where user_id=auth.uid() and record_id=p_record_id;
  return jsonb_build_object('status','applied','version',p_version);
end;$$;
grant execute on function public.apply_user_record(text,text,text,integer,integer,jsonb,timestamptz,timestamptz) to authenticated;

create table if not exists public.consent_events(
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  event text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.consent_events enable row level security;
create policy "users manage own consent" on public.consent_events for all using(auth.uid()=user_id) with check(auth.uid()=user_id);

create table if not exists public.integration_connections(
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  provider text not null,
  status text not null default 'disconnected',
  scopes text[] not null default '{}',
  connected_at timestamptz,
  disconnected_at timestamptz,
  primary key(user_id,provider)
);
alter table public.integration_connections enable row level security;
create policy "users manage own integrations" on public.integration_connections for all using(auth.uid()=user_id) with check(auth.uid()=user_id);

create or replace function public.delete_current_user() returns void language plpgsql security definer set search_path=public as $$
begin
  delete from public.user_records where user_id=auth.uid();
  delete from public.consent_events where user_id=auth.uid();
  delete from public.integration_connections where user_id=auth.uid();
  delete from auth.users where id=auth.uid();
end;$$;
revoke all on function public.delete_current_user() from public;
grant execute on function public.delete_current_user() to authenticated;
