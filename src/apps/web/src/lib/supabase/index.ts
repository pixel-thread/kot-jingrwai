import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://raumwuqggifbyboguyfq.supabase.co";

const supabaseKey = env.SUPABASE_SECRET_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
