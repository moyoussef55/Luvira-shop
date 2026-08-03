const SUPABASE_URL = "ضع رابط مشروع Supabase هنا";
const SUPABASE_ANON_KEY = "ضع مفتاح anon public هنا";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
