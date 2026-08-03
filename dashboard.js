// ======================================
// LUVIRA Dashboard
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        if (typeof protectPage === "function") {
            await protectPage();
        }

        await loadDashboard();

    } catch (err) {

        console.error("Dashboard Error:", err);

    }

});

// ======================================
// Load Dashboard
// ======================================

async function loadDashboard() {

    await Promise.all([
        loadProductsCount(),
        loadOrdersCount(),
        loadCustomersCount(),
        loadSalesTotal()
    ]);

}

// ======================================
// Products Count
// ======================================

async function loadProductsCount() {

    const { count, error } = await supabase
        .from("products")
        .select("*", {
            count: "exact",
            head: true
        });

    if (error) {

        console.error("Products:", error);

        return;

    }

    const element = document.getElementById("productsCount");

    if (element) {

        element.textContent = count ?? 0;

    }

}

// ======================================
// Orders Count
// ======================================

async function loadOrdersCount() {

    const { count, error } = await supabase
        .from("orders")
        .select("*", {
            count: "exact",
            head: true
        });

    if (error) {

        console.error("Orders:", error);

        return;

    }

    const element = document.getElementById("ordersCount");

    if (element) {

        element.textContent = count ?? 0;

    }

}

// ======================================
// Customers Count
// ======================================

async function loadCustomersCount() {

    const { count, error } = await supabase
        .from("customers")
        .select("*", {
            count: "exact",
            head: true
        });

    if (error) {

        console.error("Customers:", error);

        return;

    }

    const element = document.getElementById("customersCount");

    if (element) {

        element.textContent = count ?? 0;

    }

}

// ======================================
// Sales Total
// ======================================

async function loadSalesTotal() {

    const { data, error } = await supabase
        .from("orders")
        .select("total");

    if (error) {

        console.error("Sales:", error);

        return;

    }

    const total = (data || []).reduce((sum, item) => {

        return sum + Number(item.total || 0);

    }, 0);

    const element = document.getElementById("salesTotal");

    if (element) {

        element.textContent =
            total.toLocaleString("ar-EG") + " ج.م";

    }

}