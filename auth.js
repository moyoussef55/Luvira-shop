// =====================================
// LUVIRA AUTH SYSTEM
// =====================================

// التحقق من وجود جلسة تسجيل دخول
async function checkAuth() {

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
        return null;
    }

    return data.session;
}

// تسجيل الدخول
async function login(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    return { data, error };
}

// تسجيل الخروج
async function logout() {

    await supabase.auth.signOut();

    window.location.href = "login.html";

}

// حماية الصفحات
async function protectPage() {

    const session = await checkAuth();

    if (!session) {

        window.location.href = "login.html";

    }

}