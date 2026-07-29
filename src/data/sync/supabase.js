import{createClient}from'@supabase/supabase-js';
export function cloudConfigured(env=import.meta.env){return Boolean(env.VITE_SUPABASE_URL&&env.VITE_SUPABASE_ANON_KEY&&env.VITE_ENABLE_CLOUD_SYNC==='true')}
function mapRow(row){return{id:row.record_id,collection:row.collection,key:row.record_key,version:row.version,updatedAt:row.updated_at,deletedAt:row.deleted_at,data:row.payload}}
export function createSupabaseAdapter(env=import.meta.env){
  if(!cloudConfigured(env))return null;
  const client=createClient(env.VITE_SUPABASE_URL,env.VITE_SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  return{
    client,
    async session(){return(await client.auth.getSession()).data.session},
    onAuthChange(callback){const{data}=client.auth.onAuthStateChange((_event,session)=>callback(session));return()=>data.subscription.unsubscribe()},
    async signIn(email){return client.auth.signInWithOtp({email,options:{emailRedirectTo:location.href.split('#')[0]}})},
    async signOut(){return client.auth.signOut()},
    async listRecords(){const{data,error}=await client.from('user_records').select('*').order('record_id');if(error)throw error;return(data||[]).map(mapRow)},
    async push(operation){
      const record=operation.record;
      const{data,error}=await client.rpc('apply_user_record',{p_record_id:record.id,p_collection:record.collection,p_record_key:record.key,p_version:record.version,p_base_version:operation.baseVersion||0,p_payload:record.data,p_updated_at:record.updatedAt,p_deleted_at:record.deletedAt});
      if(error)throw error;
      if(data?.status==='conflict'){const conflict=new Error('Remote record changed before this operation could be applied.');conflict.code='VERSION_CONFLICT';conflict.current=data.current?mapRow(data.current):null;throw conflict}
      return data;
    },
    async addConsent(event,detail={}){const{error}=await client.from('consent_events').insert({event,detail});if(error)throw error},
    async listConsents(){const{data,error}=await client.from('consent_events').select('*').order('created_at',{ascending:false});if(error)throw error;return data||[]},
    async setIntegration(provider,status,scopes=[]){const now=new Date().toISOString(),row={provider,status,scopes,connected_at:status==='connected'?now:null,disconnected_at:status==='disconnected'?now:null};const{error}=await client.from('integration_connections').upsert(row,{onConflict:'user_id,provider'});if(error)throw error},
    async listIntegrations(){const{data,error}=await client.from('integration_connections').select('*');if(error)throw error;return data||[]},
    async deleteAccount(){const{error}=await client.rpc('delete_current_user');if(error)throw error}
  }
}
