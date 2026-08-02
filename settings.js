async function loadSettings() {

    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .limit(1)
        .single();

    if (error) {

        console.log(error);

        return;

    }

    document.getElementById("storeName").value = data.store_name || "";

    document.getElementById("logo").value = data.logo || "";

    document.getElementById("whatsapp").value = data.whatsapp || "";

    document.getElementById("email").value = data.email || "";

    document.getElementById("address").value = data.address || "";

    document.getElementById("facebook").value = data.facebook || "";

    document.getElementById("instagram").value = data.instagram || "";

    document.getElementById("tiktok").value = data.tiktok || "";

    document.getElementById("currency").value = data.currency || "EGP";

    document.getElementById("tax").value = data.tax || 0;

    document.getElementById("storeStatus").checked = data.store_status;

}
async function saveSettings(e) {

    e.preventDefault();

    const settings = {

        store_name: document.getElementById("storeName").value,

        logo: document.getElementById("logo").value,

        whatsapp: document.getElementById("whatsapp").value,

        email: document.getElementById("email").value,

        address: document.getElementById("address").value,

        facebook: document.getElementById("facebook").value,

        instagram: document.getElementById("instagram").value,

        tiktok: document.getElementById("tiktok").value,

        currency: document.getElementById("currency").value,

        tax: Number(document.getElementById("tax").value),

        store_status: document.getElementById("storeStatus").checked

    };

    const { data } = await supabase
        .from("settings")
        .select("id")
        .limit(1);

    if (data && data.length > 0) {

        await supabase
            .from("settings")
            .update(settings)
            .eq("id", data[0].id);

    } else {

        await supabase
            .from("settings")
            .insert([settings]);

    }

    alert("تم حفظ الإعدادات بنجاح");

}

document
    .getElementById("settingsForm")
    .addEventListener("submit", saveSettings);

loadSettings();