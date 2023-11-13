const buyListY = 185;
const scrollUp = 250;


let itemList = {
    nameArr: [],
    priceArr: [],
    imgArr: [],
    enArr: [],
    deArr: [],
    foodArr: []
};


window.addEventListener('scroll', function () {
    let headerHeight = document.getElementById('header-container').offsetHeight;
    let cartHeight = document.getElementById('shopping-cart').offsetHeight;
    let payHeight = document.getElementById('pay').offsetHeight
    let wHeight = window.innerHeight
    let minHeight = wHeight - (headerHeight + cartHeight + payHeight) - 50;
    let maxHeight = wHeight - (cartHeight + payHeight) - 75;
    if (window.scrollY <= buyListY) {
        document.getElementById('buy-list').style.height = minHeight + "px"
    } else {
        document.getElementById('buy-list').style.height = maxHeight + "px"
    }
});


window.addEventListener('scroll', function () {
    let pay = document.getElementById('checkout-container').getAttribute('data-active')
    if (window.scrollY <= scrollUp) {
        document.getElementById('scroll-up-btn').classList.add('d-none')
    } else if(pay == "false"){
        document.getElementById('scroll-up-btn').classList.remove('d-none')
    }
});


function register() {
    document.getElementById('overlay-bg').classList.remove('d-none');
};


function removeRegister() {
    document.getElementById('overlay-bg').classList.add('d-none')
};


function changeLanguage() {
    let btn = document.getElementById('language');
    if (btn.getAttribute('data-language') === "german") {
        btn.setAttribute('data-language', 'english');
        btn.setAttribute('src', 'style/img/engBtn.png');
        changeEnText();
        return renderMain()
    } else if (btn.getAttribute('data-language') === "english") {
        btn.setAttribute('data-language', 'german');
        btn.setAttribute('src', 'style/img/deBtn.png');
        changeDeText()
        return renderMain()
    }
};


function changeDeText() {
    empty = de.empty
    fullCart = de.cart
    tooltip = de.tooltip
    lowPrice = de.lowPrice
    priceLeft = de.priceLeft
    totalSum = de.total
    subtotalSum = de.subtotal
    delivery = de.delivery
    priceToPay = de.toPay
    salad = de.salad
};


function changeEnText() {
    empty = en.empty
    fullCart = en.cart
    tooltip = en.tooltip
    lowPrice = en.lowPrice
    priceLeft = en.priceLeft
    totalSum = en.total
    subtotalSum = en.subtotal
    delivery = en.delivery
    priceToPay = en.toPay
    salad = en.salad
};


function setListener() {
    for (let i = 0; i < buys.length; i++) {
        let minus = document.getElementById(`minus${i}`);
        let plus = document.getElementById(`plus${i}`);
        minus.addEventListener('mouseover', changeMinus);
        minus.addEventListener('mouseleave', removeMinus);
        plus.addEventListener('mouseover', changePlus);
        plus.addEventListener('mouseleave', removePlus);
    }
};


function active(i) {
    let list = document.getElementsByClassName('bar-icon');
    let a = document.getElementById(`menu-id${i}`);
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
    }
    return a.classList.add('active');
};


function clearItemList() {
    itemList = {
        nameArr: [],
        priceArr: [],
        imgArr: [],
        enArr: [],
        deArr: [],
        foodArr: []
    };

    return itemList
}


function searchBar() {
    let character = document.getElementById('search-bar').value.toLowerCase();
    if (character.length < 1) {
        return
    }
    clearItemList();
    for (let i = 1; i < menu.length; i++) {
        let matchList = menu[i].variant.name.map((food) => food.toLowerCase());
        for (let k = 0; k < matchList.length; k++) {
            if (matchList[k].includes(character)) {
                itemList.nameArr.push(menu[i].variant.name[k]);
                itemList.priceArr.push(menu[i].variant.price[k]);
                itemList.imgArr.push(menu[i].variant.img[k]);
                itemList.enArr.push(menu[i].variant.description[k]);
                itemList.deArr.push(menu[i].variant.beschreibung[k]);
                itemList.foodArr.push(menu[i].variant.food);
            } console.log(itemList)
        }
    } renderSearch(itemList)
};