///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////alle numbers in der Kasse noch zu toFixed(2)!!!!!!!!!!/////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


let buys = [];
let foodKind = [];
let amount = [];
let toPay = [];

let empty = "Der Warenkorb ist leer...";
let fullCart = "Warenkorb";
let tooltip = "Hier könnten kCal und weitere Angaben stehen";
let lowPrice = "Leider kannst du noch nicht bestellen. Quality-Time bekommst du erst ab einem Bestellwert von mind. 20 € geliefert.";
let priceLeft = "Benötiger Betrag, um den Mindesbestellwert zu erreichen";
let totalSum = "Gesamt";
let subtotalSum = "Zischensumme";
let delivery = "Lieferkosten";
let priceToPay = "Bezahlen";
let salad = "Salat"

const en = {
    empty: "Your shopping-cart is empty...",
    cart: "Shopping-Cart",
    tooltip: "a placeholder for kCal and other stuff of",
    lowPrice: "To deliver the main ingredient of your Quality-Time, we need you to order for at least 20 €",
    priceLeft: "You nearly got it! Just a little more to reach the minimum order value!",
    total: "Total",
    subtotal: "Subtotal",
    delivery: "Delivery-fee",
    toPay: "To pay",
    salad: "Salad"
};

const de = {
    empty: "Der Warenkorb ist leer...",
    cart: "Warenkorb",
    tooltip: "Hier könnten kCal und weitere Angaben stehen",
    lowPrice: "Leider kannst du noch nicht bestellen. Quality-Time bekommst du erst ab einem Bestellwert von mind. 20 € geliefert.",
    priceLeft: "Benötiger Betrag, um den Mindesbestellwert zu erreichen",
    total: "Gesamt",
    subtotal: "Zischensumme",
    delivery: "Lieferkosten",
    toPay: "Bezahlen",
    salad: "Salat"
};


fetch('pizza.json')
    .then(response => {
        if (!response.ok) {
            alert("Fehler beim Laden der Seite!")
        } else {
            return response.json()
        }
    })
    .then(json => {
        menu = json;
        load();
        renderMain()
    });


function renderMain() {
    let main = document.getElementById('main');
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
        <div id="banner-container">
            <img id="banner" src="${menu[0].titleImg}" alt="">
            <img id="company-logo" src="style/img/logo-neu.png" alt="">
        </div>
        <div id="restaurant">
            <h2>
                <b>Quality-Time Restaurant</b>
            </h2>
        </div>
        <div id="menu-bar" class="row">
        </div>
        <div id="products"></div>       
    `;
    renderMenu();
};


function renderMenu() {
    let menuBar = document.getElementById('menu-bar');
    menuBar.innerHTML =/*html*/`
        <div id="search-bar-container">
             <img onclick="openSearch()" id="lupe" src="style/img/lupe.png" alt="lupe">
             <div id="search-space">
        </div>
        </div>
        <div class="dropdown" onclick="openDropdown()">
            <button id="dropbtn" >Menu</button>
            <div id="dropdown-content" class="d-none">
                <a class="bar-icon" href="#product-list-header1" onclick="closeDropdown(event)">Pizza</a>
                <a class="bar-icon" href="#product-list-header2" onclick="closeDropdown(event)">Pasta</a>
                <a class="bar-icon" href="#product-list-header3" onclick="closeDropdown(event)">Burger</a>                
                <a class="bar-icon" href="#product-list-header4" onclick="closeDropdown(event)">${salad}</a>
            </div>
        </div>
    `
    for (let i = 1; i < menu.length; i++) {

        menuBar.innerHTML +=/*html*/`
        <div>
            <a class="bar-icon"  id="menu-id${i}" onclick="(active(${i}))" href="#product-list-header${i}">
                ${menu[i].variant.food}
            </a>
        </div>
        `; renderProducts(i)
    };
};


function renderProducts(i) {
    let productBox = document.getElementById('products');
    productBox.innerHTML +=/*html*/`
        <div class="variant" id="product-head${i}">
            <div id="product-list-header${i}">${menu[i].variant.food}</div>
        </div>
        <img class="list-head-img" 
            id="list-header-img${i}" 
            src="${menu[i].variant.titleImg}" 
            alt="list-header Img">
        <div id="product-list${i}"></div>
    `; renderProductList(i)
};


function renderOnloadProducts() {
    let productBox = document.getElementById('products');
    productBox.innerHTML = '';
    productBox.innerHTML +=/*html*/`
        <div id="product-head">
            ${menu[0].name}
        </div>
        <div id="product-list"></div>
    `;
};


function renderProductList(i) {
    let productList = document.getElementById(`product-list${i}`);
    let btn = document.getElementById('language').getAttribute('data-language');
    productList.innerHTML = '';
    for (let k = 0; k < menu.length - 2; k++) {
        let name = menu[i].variant.name;
        let price = menu[i].variant.price;
        let img = menu[i].variant.img;
        let description;
        if (btn === "german") {
            description = menu[i].variant.beschreibung;
        } else if (btn === "english") {
            description = menu[i].variant.description;
        }
        productList.innerHTML +=/*html*/`

        <div class="food-box">
            <div class="product-name" id="product${i}${k}">
                ${name[k]} 
                <img class="info-icon" id="info${i}${k}" src="style/img/info_icon.png" alt="">
                <span class="tooltiptext">${tooltip}</span>            
            </div>
            <div class="description">${description[k]}</div>

            <div class="food-img-container">
                <div class="price" id="price${i}${k}">${price[k]} €</div>
                <div><img class="product-view" src="${img[k]}" alt=""></div>
                
            </div>
            <div><img class="plus" src="style/img/plus.png" onclick="pushProduct(${i},${k})" alt=""></div>
        </div>
    `}; renderCheckoutContainer()
};


function renderCheckoutContainer() {
    let container = document.getElementById('checkout-container');
    container.innerHTML = '';
    container.innerHTML =/*html*/`
        <div id="checkout">
            <div id="buy-list"></div>
            <div id="pay"></div>
        </div>
    `;
    renderCheckout();
    setListener();
};


function renderCheckout() {
    let checkout = document.getElementById('checkout');

    checkout.innerHTML =/*html*/`
        <div id="shopping-cart">
            <div id="cart-h"></div>
            <button id="checkout-pay-back" class="d-none x-overlay" onclick="closeMobilePay()"></button>
            <div id="cart-icon-container">
                <img id="burger-animation" src="style/img/burgerAni.png" alt="test">
                <img id="pizza-animation" src="style/img/pizzaAni.png" alt="test">
                <img id="noodle-animation" src="style/img/noodleAni.png" alt="test">
                <img id="salad-animation" src="style/img/veggiAni.png" alt="test">
                <img id="cart-icon" src="style/img/cart.png" alt="shopping-cart">
            </div>
        </div>
        <div id="buy-list"></div>
        <div id="pay"></div>
        `;
    keepFoodInCart();
    renderBuyList();
    checkCart();
};


function renderBuyList() {
    let subTotal = 0;
    let checkout = document.getElementById('buy-list');
    checkout.innerHTML = '';

    for (let i = 0; i < buys.length; i++) {
        let num = subtotal(amount[i], toPay[i]);
        subTotal += num;
        checkout.innerHTML +=/*html*/`
            <div class="buy-list" id="buy-list${i}">
                <div class="top">
                    <div class="amount-of">
                        <div class="amount">${amount[i]}</div>
                        <div class="of-product">${buys[i]}</div>
                    </div>
                    <div class="sum-of-amount">${num} €</div>
                </div>
                <div class="bottom">
                    <span class="btn-span">
                        <button class="plus-minus" onclick="decreaseAmount(${i})">
                            <img id="minus${i}" class="amountBtn" src="style/img/minusBtn.png" alt="">
                        </button>
                    </span>
                    <input class="count" type="number" min="1" name="amount" id="count${i}" value="${amount[i]}">
                    <span class="btn-span">
                        <button class="plus-minus" onclick="increaseAmount(${i})">
                            <img id="plus${i}" class="amountBtn" src="style/img/plusBtn.png" alt="">
                        </button>
                    </span>
                </div>
            </div>      
        `;
    };
    renderPayment(subTotal);
    setListener();
};


function renderPayment(subTotal) {
    let deliveryFee = 5.00;
    subTotal = parseFloat(subTotal).toFixed(2);
    let payment = document.getElementById('pay');
    payment.innerHTML = '';
    deliveryFee = parseFloat(deliveryFee).toFixed(2);
    let finalSum = Number(deliveryFee) + Number(subTotal);
    finalSum = parseFloat(finalSum).toFixed(2);
    let difference = Number(subTotal) - 20;
    difference = parseFloat(difference).toFixed(2);
    if (Number(subTotal < 20)) {
        finalSum = finalSum - 5;
        payment.innerHTML =/*html*/`
            <div class="difference">
                <div id="difference">${priceLeft}</div>
                <div id="money-left">${Number(difference)} €</div>
            </div>
            <div id="sorry">
                ${lowPrice}
            </div>
            <div id="not-pay-btn">
                <button class="pay-button">${priceToPay} (${Number(finalSum)} €)</button>
            </div>
        `;
    } else {
        payment.innerHTML +=/*html*/`
        <div class="sum-to-pay" id="actual-sum">
            <div id="s-total">${subtotalSum}</div>
            <div>${subTotal} €</div>
        </div>
        <div class="sum-to-pay" id="delivery-sum">
            <div id="deliver">${delivery}</div>
            <div>${deliveryFee} €</div>
        </div>
        <div class="sum-to-pay" id="whole-sum">
            <div id="final-total">${totalSum}</div>
            <div><b>${finalSum} €</b></div>
        </div>
        <div id="pay-btn">
            <button class="pay-button" id="yes-pay-btn" onclick="alert('Hier ist die Vorführung zu Ende :)')">
                <div>${priceToPay} &nbsp;</div>
                <div>(${Number(finalSum)} €)</div>
            </button>
        </div>
    `};
};


function renderSearch(itemList) {
    let productList = document.getElementById(`products`);
    let btn = document.getElementById('language').getAttribute('data-language');
    productList.innerHTML = '';
    for (let i = 0; i < itemList.nameArr.length; i++) {
        let name = itemList.nameArr[i];
        let price = itemList.priceArr[i];
        let img = itemList.imgArr[i];
        let description;
        if (btn === "german") {
            description = itemList.deArr[i];
        } else if (btn === "english") {
            description = itemList.enArr[i];
        }
        productList.innerHTML +=/*html*/`
        <div class="food-box">
            <div class="product-name" id="product${i}$">
                ${name} 
                <img class="info-icon" id="info${i}$" src="style/img/info_icon.png" alt="">
                <span class="tooltiptext">${tooltip}</span>            
            </div>
            <div class="description">${description}</div>
            <div class="price" id="price${i}$">${price} €</div>
            <div><img class="product-view" src="${img}" alt=""></div>
            <div><img class="plus" src="style/img/plus.png" onclick="pushSearchProduct(${i},${i})" alt=""></div>
        </div>
    `
    } renderCheckoutContainer()
};


function save() {
    let buysToStorage = JSON.stringify(buys);
    let foodKindStorage = JSON.stringify(foodKind);
    let amountStorage = JSON.stringify(amount);
    let toPayStorage = JSON.stringify(toPay);
    localStorage.setItem('buys', buysToStorage);
    localStorage.setItem('foodKind', foodKindStorage);
    localStorage.setItem('amount', amountStorage);
    localStorage.setItem('toPay', toPayStorage);
};


function load() {
    let buysToStorage = localStorage.getItem('buys');
    let foodKindStorage = localStorage.getItem('foodKind');
    let amountStorage = localStorage.getItem('amount');
    let toPayStorage = localStorage.getItem('toPay');
    if (foodKindStorage) {
        foodKind = JSON.parse(foodKindStorage);
        if (buysToStorage && toPayStorage && amountStorage) {
            buys = JSON.parse(buysToStorage);
            amount = JSON.parse(amountStorage);
            toPay = JSON.parse(toPayStorage);
        };
    }
};