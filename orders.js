async function loadOrders() {

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("ordersTable");

    table.innerHTML = "";

    data.forEach(order => {

        table.innerHTML += `

<tr>

<td>${order.id}</td>

<td>${order.customer_name}</td>

<td>${order.phone}</td>

<td>${order.total} ج.م</td>

<td>${order.status}</td>

<td>${new Date(order.created_at).toLocaleDateString()}</td>

<td>

<button>
View
</button>

</td>

</tr>

`;

    });

}

loadOrders();