
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.innerHTML = "";

    if (!email || !password) {

        message.style.color = "red";
        message.innerHTML = "برجاء إدخال البريد الإلكتروني وكلمة المرور";
        return;

    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = "جاري تسجيل الدخول...";

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {

        message.style.color = "red";
        message.innerHTML = error.message;

        loginBtn.disabled = false;
        loginBtn.innerHTML = "تسجيل الدخول";

        return;
    }

    window.location.href = "dashboard.html";

});
