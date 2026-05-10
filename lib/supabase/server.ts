import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const createClient = async () => {
  // Ideally this would use @supabase/ssr and cookies for Server Actions/Components
  // For the current setup relying on @supabase/supabase-js, we return a singleton client
  // Wait, returning a new instance so it's fresh for the request.
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
