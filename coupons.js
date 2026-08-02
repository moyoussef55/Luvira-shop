async function loadCoupons() {

    const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        return;

    }

    const table = document.getElementById("couponsTable");

    table.innerHTML = "";

    data.forEach(coupon => {

        table.innerHTML += `

<tr>

<td>${coupon.code}</td>

<td>${coupon.discount}%</td>

<td>${coupon.active ? "Active" : "Inactive"}</td>

<td>

<button onclick="deleteCoupon('${coupon.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}

async function addCoupon() {

    const code = prompt("Coupon Code");

    if (!code) return;

    const discount = prompt("Discount %");

    if (!discount) return;

    const { error } = await supabase

        .from("coupons")

        .insert([{

            code,

            discount,

            active: true

        }]);

    if (error) {

        alert(error.message);

        return;

    }

    loadCoupons();

}

async function deleteCoupon(id) {

    await supabase

        .from("coupons")

        .delete()

        .eq("id", id);

    loadCoupons();

}

loadCoupons();