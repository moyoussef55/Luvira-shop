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
let editingId = null;
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
<button class="edit-btn" onclick="editProduct('${product.id}')">
✏️ Edit
</button>

<button class="delete-btn" onclick="deleteProduct('${product.id}')">
🗑 Delete
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

    let error;

if (editingId) {

    ({ error } = await supabase
        .from("products")
        .update(product)
        .eq("id", editingId));

} else {

    ({ error } = await supabase
        .from("products")
        .insert([product]));

}
    if (error) {

        alert(error.message);

        console.error(error);

        return;

    }

    alert("تم إضافة المنتج بنجاح");

    document.getElementById("productForm").reset();
editingId = null;
    loadProducts();

}
async function editProduct(id) {

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    editingId = id;

    document.getElementById("productName").value = data.name || "";
    document.getElementById("description").value = data.description || "";
    document.getElementById("category").value = data.category || "";
    document.getElementById("brand").value = data.brand || "";
    document.getElementById("price").value = data.price || "";
    document.getElementById("comparePrice").value = data.compare_price || "";
    document.getElementById("stock").value = data.stock || "";
    document.getElementById("sku").value = data.sku || "";
    document.getElementById("barcode").value = data.barcode || "";
    document.getElementById("image").value = data.image || "";

    document.getElementById("featured").checked = data.featured;
    document.getElementById("bestSeller").checked = data.best_seller;
    document.getElementById("newArrival").checked = data.new_arrival;
    document.getElementById("active").checked = data.active;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

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