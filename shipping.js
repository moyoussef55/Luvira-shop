async function loadShipping() {

    const { data, error } = await supabase
        .from("shipping")
        .select("*")
        .order("governorate");

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("shippingTable");

    table.innerHTML = "";

    data.forEach(item => {

        table.innerHTML += `

<tr>

<td>${item.governorate}</td>

<td>${item.price} ج.م</td>

<td>

<button onclick="deleteShipping('${item.id}')">
Delete
</button>

</td>

</tr>

`;

    });

}

async function addShipping() {

    const governorate = prompt("Governorate");

    if (!governorate) return;

    const price = prompt("Shipping Price");

    if (!price) return;

    const { error } = await supabase
        .from("shipping")
        .insert([{
            governorate,
            price
        }]);

    if (error) {
        alert(error.message);
        return;
    }

    loadShipping();

}

async function deleteShipping(id) {

    await supabase
        .from("shipping")
        .delete()
        .eq("id", id);

    loadShipping();

}

loadShipping();