const SUPABASE_URL = "https://btjjjsewlfyllatlasoy.supabase.co";
const SUPABASE_KEY = "sb_publishable_hNFVGcinK8LtYz-s4oCoWg_FSW3GfTs";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

async function loadProducts() {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");

  if (error) {
    console.log(error);
    return;
  }

  products = data;

  const container = document.querySelector(".product-grid");

  container.innerHTML = "";

  data.forEach(product => {

    container.innerHTML += `

    <div class="product-card">

      <img src="${product.image}" alt="${product.name}">

      <h3>${product.name}</h3>

      <div class="product-description">

        <strong>الوصف</strong>

        <p>${product.description}</p>

      </div>

      <div class="product-price">

        ${product.price} جنيه

      </div>

      <button onclick="addToCart(${product.id})">

        🛒 أضف للسلة

      </button>

      <button onclick="buyNow(${product.id})">

        ⚡ اشترِ الآن

      </button>

    </div>

    `;

  });

}

function addToCart(id){

  const product = products.find(p=>p.id===id);

  if(!product) return;

  const item = cart.find(p=>p.id===id);

  if(item){

      item.qty++;

  }else{

      cart.push({

          id:product.id,

          name:product.name,

          price:product.price,

          qty:1

      });

  }

  renderCart();
localStorage.setItem("cart", JSON.stringify(cart));
}
function removeFromCart(id){

    cart = cart.filter(item => item.id !== id);

    renderCart();
localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart(){

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if(!cartItems || !total) return;

    cartItems.innerHTML = "";

    let sum = 0;

    cart.forEach(item=>{

        sum += item.price * item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <strong>${item.name}</strong>

            <br>

            الكمية : ${item.qty}

            <br>

            السعر : ${item.price * item.qty} جنيه

            <br><br>

            <button onclick="removeFromCart(${item.id})">

                ❌ حذف

            </button>

        </div>

        <hr>

        `;

    });

    total.innerText = sum;

}

function buyNow(id){

    addToCart(id);

    document.getElementById("cart").scrollIntoView({

        behavior:"smooth"

    });

}
async function checkout() {

    if (cart.length === 0) {
        alert("السلة فارغة");
        return;
    }
setCheckoutLoading(true);
    const customerName = prompt("اكتب اسمك");
    if (!customerName) {
    setCheckoutLoading(false);
    return;
}

    const phone = prompt("اكتب رقم الهاتف");
    if (!phone) {
    setCheckoutLoading(false);
    return;
}

    const address = prompt("اكتب العنوان");
    if (!address) {
    setCheckoutLoading(false);
    return;
}

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
    });

    const { data, error } = await supabase
        .from("orders")
        .insert([
            {
                customer_name: customerName,
                phone: phone,
                address: address,
                total: total,
                status: "Pending"
            }
        ]);

    if (error) {
    console.log(error);
    alert("حدث خطأ أثناء إرسال الطلب");
    setCheckoutLoading(false);
    return;
}

    alert("تم إرسال الطلب بنجاح");

    cart = [];

    renderCart();
    localStorage.removeItem("cart");
    
setCheckoutLoading(false);
}

const checkoutBtn = document.getElementById("checkout-btn");
function setCheckoutLoading(loading) {
    if (!checkoutBtn) return;

    checkoutBtn.disabled = loading;

    if (loading) {
        checkoutBtn.textContent = "⏳ جاري إرسال الطلب...";
    } else {
        checkoutBtn.textContent = "إتمام الطلب";
    }
}
if (checkoutBtn) {

    checkoutBtn.addEventListener("click", checkout);

}

loadProducts();
renderCart();