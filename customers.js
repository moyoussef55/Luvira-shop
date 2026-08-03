async function loadCustomers() {

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("customersTable");

    table.innerHTML = "";

    const customers = {};

    data.forEach(order => {

        if (!customers[order.phone]) {

            customers[order.phone] = {
                name: order.customer_name,
                phone: order.phone,
                governorate: order.governorate,
                orders: 1
            };

        } else {

            customers[order.phone].orders++;

        }

    });

    Object.values(customers).forEach(customer => {

        table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.governorate || "-"}</td>

<td>${customer.orders}</td>

</tr>

`;

    });

}

loadCustomers();