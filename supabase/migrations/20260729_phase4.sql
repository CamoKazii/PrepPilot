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
create table if not exists public.consent_events(
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  event text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.consent_events enable row level security;
create policy "users manage own consent" on public.consent_events for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
create or replace function public.delete_current_user() returns void language plpgsql security definer set search_path=public as $$
begin
  delete from public.user_records where user_id=auth.uid();
  delete from public.consent_events where user_id=auth.uid();
  delete from auth.users where id=auth.uid();
end;$$;
revoke all on function public.delete_current_user() from public;
grant execute on function public.delete_current_user() to authenticated;
