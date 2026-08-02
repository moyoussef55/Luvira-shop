// ======================================
// LUVIRA PRODUCTS
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        if (typeof protectPage === "function") {
            await protectPage();
        }

        await loadProducts();

        document
            .getElementById("productForm")
            .addEventListener("submit", saveProduct);

    } catch (err) {

        console.error(err);

    }

});

// ======================================
// Load Products
// ======================================

async function loadProducts() {

    const { data, error } = await supabase

        .from("products")

        .select("*")

        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        return;

    }

    const table = document.getElementById("productsTable");

    table.innerHTML = "";

    data.forEach(product => {

        table.innerHTML += `

<tr>

<td>

<img src="${product.image || ''}"

style="width:60px;height:60px;border-radius:10px;object-fit:cover;">

</td>

<td>${product.name}</td>

<td>${product.category || "-"}</td>

<td>${product.price} ج.م</td>

<td>${product.stock}</td>

<td>

<button onclick="deleteProduct('${product.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}
// ======================================
// Save Product
// ======================================

async function saveProduct(e) {

    e.preventDefault();

    const product = {

        name: document.getElementById("productName").value,

        description: document.getElementById("description").value,

        category: document.getElementById("category").value,

        brand: document.getElementById("brand").value,

        price: Number(document.getElementById("price").value),

        compare_price: Number(document.getElementById("comparePrice").value),

        stock: Number(document.getElementById("stock").value),

        sku: document.getElementById("sku").value,

        barcode: document.getElementById("barcode").value,

        image: document.getElementById("image").value,

        featured: document.getElementById("featured").checked,

        best_seller: document.getElementById("bestSeller").checked,

        new_arrival: document.getElementById("newArrival").checked,

        active: document.getElementById("active").checked

    };

    const { error } = await supabase

        .from("products")

        .insert([product]);

    if (error) {

        alert(error.message);

        console.error(error);

        return;

    }

    alert("تم إضافة المنتج بنجاح");

    document.getElementById("productForm").reset();

    loadProducts();

}

// ======================================
// Delete Product
// ======================================

async function deleteProduct(id) {

    if (!confirm("هل تريد حذف المنتج؟")) return;

    const { error } = await supabase

        .from("products")

        .delete()

        .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    loadProducts();

}