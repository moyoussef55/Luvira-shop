const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function loadProduct() {

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    document.getElementById("productImage").src = data.image || "";

    document.getElementById("productName").textContent = data.name;

    document.getElementById("productCategory").textContent = data.category || "";

    document.getElementById("productPrice").textContent = data.price + " ج.م";

    document.getElementById("productDescription").textContent =
        data.description || "";
}

loadProduct();