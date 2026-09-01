// ================================
// CART
// ================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ADD FOOD TO CART

function addToCart(name, price, image) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


// UPDATE CART COUNT

function updateCartCount() {

    const countElement =
        document.getElementById("cart-count");

    if (!countElement) return;

    const count = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    countElement.textContent = count;
}


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<h3>Your cart is empty 🛒</h3>";

        document.getElementById("subtotal")
            .textContent = "0";

        document.getElementById("total")
            .textContent = "0";

        return;
    }


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-left">

                <div class="cart-emoji">
                    ${item.image}
                </div>

                <div>

                    <h3>${item.name}</h3>

                    <p>₹${item.price}</p>

                </div>

            </div>


            <div class="quantity">

                <button onclick="changeQuantity(${index}, -1)">
                    -
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>


            <button
                class="remove"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;

        cartContainer.appendChild(cartItem);

    });


    calculateTotal();
}


// CHANGE QUANTITY

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}


// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}


// CALCULATE TOTAL

function calculateTotal() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });

    const delivery =
        cart.length > 0 ? 40 : 0;

    const total =
        subtotal + delivery;


    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("delivery");

    const totalElement =
        document.getElementById("total");


    if (subtotalElement)
        subtotalElement.textContent =
            subtotal;

    if (deliveryElement)
        deliveryElement.textContent =
            delivery;

    if (totalElement)
        totalElement.textContent =
            total;
}


// ================================
// SEARCH
// ================================

function searchFood() {

    const searchInput =
        document.getElementById("search");

    const searchValue =
        searchInput.value.toLowerCase();

    const foods =
        document.querySelectorAll(".food-card");


    foods.forEach(food => {

        const foodName =
            food.querySelector("h3")
                .textContent
                .toLowerCase();


        if (foodName.includes(searchValue)) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


// ================================
// FILTER
// ================================

function filterFood(category) {

    const foods =
        document.querySelectorAll(".food-card");


    foods.forEach(food => {

        const foodCategory =
            food.getAttribute("data-category");


        if (
            category === "all" ||
            foodCategory === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });

}


// ================================
// PLACE ORDER
// ================================

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return;

    }


    const orderId =
        "FD" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    localStorage.setItem(
        "orderId",
        orderId
    );


    localStorage.removeItem("cart");


    window.location.href =
        "success.html";

}


// ================================
// INITIALIZE
// ================================

updateCartCount();

displayCart();