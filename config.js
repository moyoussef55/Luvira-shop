// =====================================
// LUVIRA COSMETICS - CONFIG
// =====================================

// بيانات مشروع Supabase
const SUPABASE_URL = "https://btjjjsewlfyllatlasoy.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_hNFVGcinK8LtYz-s4oCoWg_FSW3GfTs";

// إنشاء الاتصال
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// إعدادات عامة
const APP = {
    name: "LUVIRA Cosmetics",
    currency: "EGP",
    currencySymbol: "ج.م",
    version: "2.0.0"
};