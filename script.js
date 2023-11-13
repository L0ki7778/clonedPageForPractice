function subtotal(amount, price) {
    let num = amount * price;
    return num;
};


function checkCart() {
    let cart = document.getElementById('cart-h');
    if (buys.length > 0) {
        cart.innerHTML = `${fullCart}`
    } else {
        cart.innerHTML = `${empty}`
    }
}


function decreaseAmount(i) {
    if (buys[i]) {
        if (amount[i] === 1) {
            clearFoodKind(i);
            return renderBuyList(), setListener(), checkCart(), save();
        };
        --amount[i];
        return renderBuyList(), setListener(), save()
    };
};


function increaseAmount(i) {
    if (buys[i]) {
        ++amount[i];
        return renderBuyList(), setListener(), save()
    };
};


function changeMinus(event) {
    element = event.target;
    element.src = "style/img/orangeMinusBtn.png";
    element.style.opacity = "0.9"
};


function removeMinus(event) {
    element = event.target;
    element.src = "style/img/minusBtn.png";
    element.style.opacity = "0.2"
};


function changePlus(event) {
    element = event.target;
    element.src = "style/img/orangePlusBtn.png";
    element.style.opacity = "0.9"
};


function removePlus(event) {
    element = event.target;
    element.src = "style/img/plusBtn.png";
    element.style.opacity = "0.2"
};


function pushProduct(i, k) {
    let name = menu[i].variant.name[k];
    let price = menu[i].variant.price[k];
    let index = buys.indexOf(name);
    let kindOfFood = menu[i].variant.food
    if (buys.indexOf(name) === -1) {
        buys.push(name);
        toPay.push(price);
        amount.push(1);
    } else { ++amount[index] };
    checkCart();
    renderBuyList();
    setListener();
    animate(kindOfFood);
    save()
};


function pushFoodKind(meal) {
    if (!foodKind.includes(meal)) {
        foodKind.push(meal)
    };
    return
}


function animate(food) {
    for (let i = 0; i < menu.length - 1; i++) {
        if (!foodKind.includes(food)) {
            if (food == "Burger") {
                document.getElementById('burger-animation').classList.add('animate')
            } else if (food == "Pizza") {
                document.getElementById('pizza-animation').classList.add('animate')
            } else if (food == "Pasta") {
                document.getElementById('noodle-animation').classList.add('animate')
            } else if (food == "Salat") {
                document.getElementById('salad-animation').classList.add('animate')
            }; return pushFoodKind(food)
        }
    };
}


function keepFoodInCart() {
    let burger = document.getElementById("burger-animation");
    let noodle = document.getElementById('noodle-animation');
    let salad = document.getElementById('salad-animation');
    let pizza = document.getElementById('pizza-animation');
    if (foodKind.includes("Burger")) {
        burger.classList.add('animate')
    };
    if (foodKind.includes("Pizza")) {
        pizza.classList.add('animate')
    }
    if (foodKind.includes("Salat")) {
        salad.classList.add('animate')
    };
    if (foodKind.includes("Pasta")) {
        noodle.classList.add('animate')
    }
}


function clearFoodKind(i) {
    if (menu[1].variant.name.includes(buys[i])) {
        return clearPizza(i)
    } else if (menu[2].variant.name.includes(buys[i])) {
        return clearPasta(i)
    } else if (menu[3].variant.name.includes(buys[i])) {
        return clearBurger(i)
    } else if (menu[4].variant.name.includes(buys[i])) {
        return clearSalad(i)
    }
};


function clearPizza(i) {
    let pizza = menu[1].variant.name;
    let pizzaIndex = foodKind.indexOf('Pizza');
    let check = true;
    let item = buys[i];
    if (pizza.includes(item)) {
        buys.splice(i, 1);
        amount.splice(i, 1);
        toPay.splice(i, 1);
        for (let product of pizza) {
            if (buys.includes(product)) {
                check = false;
                break;
            }
        } if (!check) { return } else {
            foodKind.splice(pizzaIndex, 1);
            document.getElementById('pizza-animation').classList.remove('animate');
        }
    }
};


function clearPasta(i) {
    let pasta = menu[2].variant.name;
    let pastaIndex = foodKind.indexOf('Pasta');
    let check = true;
    let item = buys[i];
    if (pasta.includes(item)) {
        buys.splice(i, 1);
        amount.splice(i, 1);
        toPay.splice(i, 1);
        for (let product of pasta) {
            if (buys.includes(product)) {
                check = false;
                break;
            }
        }
        if (!check) { return } else {
            foodKind.splice(pastaIndex, 1);
            document.getElementById('noodle-animation').classList.remove('animate');
        }
    }
};


function clearBurger(i) {
    let burger = menu[3].variant.name;
    let check = true;
    let item = buys[i];
    let burgerIndex = foodKind.indexOf('Burger');
    if (burger.includes(item)) {
        buys.splice(i, 1);
        amount.splice(i, 1);
        toPay.splice(i, 1);
        for (let product of burger) {
            if (buys.includes(product)) {
                check = false;
                break;
            }
        } if (!check) { return } else {
            foodKind.splice(burgerIndex, 1);
            document.getElementById('burger-animation').classList.remove('animate');
        }
    }
};


function clearSalad(i) {
    let salad = menu[4].variant.name;
    let check = true;
    let item = buys[i];
    let saladIndex = foodKind.indexOf('Salat');
    if (salad.includes(item)) {
        buys.splice(i, 1);
        amount.splice(i, 1);
        toPay.splice(i, 1);
        for (let product of salad) {
            if (buys.includes(product)) {
                check = false;
                break;
            }
        } if (!check) { return } else {
            foodKind.splice(saladIndex, 1);
            document.getElementById('salad-animation').classList.remove('animate');
        }
    }
};


function openSearch() {
    if (document.getElementById('search-bar') === null) {
        let element = document.createElement('input');
        let x = document.createElement('img')
        element.setAttribute('id', "search-bar");
        x.setAttribute('class', 'x');
        x.setAttribute('id', 'search-x');
        x.setAttribute('onclick', "removeSearchBar()")
        let searchBar = document.getElementById('search-space');
        searchBar.innerHTML = '';
        searchBar.appendChild(element);
        searchBar.appendChild(x)
    };
    document.getElementById('search-bar').setAttribute('oninput', "searchBar()");
    document.getElementById('search-bar').setAttribute('placeholder', 'Suchen...')
}


function removeSearchBar() {
    let searchBar = document.getElementById('search-bar');
    let x = document.getElementById('search-x');
    let menu = document.getElementById('products');
    if (searchBar !== null) {
        searchBar.remove();
        x.remove();
        menu.innerHTML = '';
        renderMenu();
    }
}


function openDropdown() {
    let dropdown = document.getElementById('dropdown-content');
    dropdown.addEventListener('click', closeDropdown)
    dropdown.classList.remove("d-none");
}


function closeDropdown() {
    let dropdown = document.getElementById('dropdown-content');
    dropdown.removeEventListener('click', closeDropdown)
    dropdown.classList.add('d-none');
}


document.addEventListener('click', function (event) {
    if (event.target.id != 'dropdown-content' && event.target.id != 'dropbtn') {
        closeDropdown()
    }
});


function mobilePay() {
    let container = document.getElementById('checkout-container');
    let scrollBtn = document.getElementById('scroll-up-btn');
    let cartBtn = document.getElementById('checkout-pay');
    let scroll = document.getElementById('top');
    let x = document.getElementById('checkout-pay-back');
    scroll.style.overflow = "hidden";
    x.classList.remove('d-none')
    cartBtn.classList.add('d-none')
    scrollBtn.classList.add('d-none');
    container.style.visibility = 'visible';
    container.setAttribute('data-active','true')
    mobileBuyList()
}


function mobileBuyList() {
    let cartHeight = document.getElementById('shopping-cart').offsetHeight;
    let payHeight = document.getElementById('pay').offsetHeight
    let wHeight = window.innerHeight
    let buyHeight = wHeight - (cartHeight + payHeight) - 40;
    return document.getElementById('buy-list').style.height = buyHeight + "px"
}


function closeMobilePay() {
    let container = document.getElementById('checkout-container');
    let scrollBtn = document.getElementById('scroll-up-btn');
    let cartBtn = document.getElementById('checkout-pay');
    let scroll = document.getElementById('top');
    let x = document.getElementById('checkout-pay-back');
    scroll.style.overflow = "scroll";
    x.classList.add('d-none')
    cartBtn.classList.remove('d-none')
    scrollBtn.classList.remove('d-none');
    container.style.visibility = 'hidden';
    container.setAttribute('data-active','false')
}


function pushSearchProduct(i, k) {
    let name = itemList.nameArr[i];
    let price = itemList.priceArr[i];
    let index = buys.indexOf(name);
    let kindOfFood = itemList.foodArr[k]
    if (buys.indexOf(name) === -1) {
        buys.push(name);
        toPay.push(price);
        amount.push(1);
    } else {
        ++amount[index]
    };
    checkCart();
    renderBuyList();
    setListener();
    animate(kindOfFood);
    save()
};