import { createClient } from '@supabase/supabase-js';

// Replace these with the actual URL and Key from the Supabase dashboard
const supabaseUrl = 'https://rkbaqtnwavdfeipzecyk.supabase.co';
const supabaseAnonKey = 'sb_publishable_GozWlQGrHJK_OfkFBMnuxQ_UWvZLY4M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);