//Add a feature so that on click the initial input value clears so the customer can input their information with ease

import { menuArray } from "./data.js";  
let orderArray = []
const payForm = document.querySelector("#payment-form");
const menu = document.querySelector(".menu")
const orderContainer = document.querySelector('.order')

document.addEventListener('click', function(e){
    //When user adds an item through the menu or increments their item in the order menu the order container appears, items increment, and the order html updates
    if(e.target.dataset.item || e.target.dataset.add){
        let target = e.target.dataset.item || e.target.dataset.add
        render()
        orderContainer.style.display = `flex`
        handleAddItem(target)
        getOrderHtml(target)
    }
    //When a user removes an item in the order menu
    else if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
        getOrderHtml(e.target.dataset.remove)
    }
    //When a user completes a payment, the form displays
    else if(e.target.className === 'complete'){
       document.querySelector('.payment').style.display = 'flex'
    }
    else if(e.target.className === 'pay-btn'){
        paymentHandling(e)
    }
})

render()

function getMenuHtml() {
    let menuHtml = ``

    menuArray.forEach(item => {
        menuHtml += `
<div class="item">
        <div class="item-emoji" id="${item.name}-emoji">${item.emoji}</div>
        <div class="item-text" id="${item.name}-text">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(', ')}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <i class="item-add fa-light fa-plus" id="${item.id}" data-item="${item.id}"></i>
    </div>
    <hr>
    `
    })

    return menuHtml
}


//check if the array has the corresponding item id and if not push it to the array
//If the item is in the order array but the quantity is zero - remove it
function getOrderHtml(id) {
    if(!orderArray.includes(id)){
        orderArray.push(id)
    }else if(orderArray.includes(id) && menuArray[id].quantity == 0){ 
        orderArray = orderArray.filter(item => !(item === id))
    }
    //iterate over the array and pull the id that is present to render the order html. This will allow us to exlude multiple orders.
    let orderItemsHtml = ``
    orderArray.forEach(item => {
        orderItemsHtml +=
            `<div class="order-item ${menuArray[item].name}" id="${id}">
                <h3 class="order-name">${menuArray[item].name}</h3>
                <button class="remove" data-remove="${menuArray[item].id}">-</button>
                <p class="quantity">Quantity: ${menuArray[item].quantity}</p>
                <button class="add" data-add="${menuArray[item].id}">+</button>
                <p class="item-price order-item-price">Price: $${menuArray[item].price * menuArray[item].quantity}</p>
            </div>`
    })

    let orderTotal = 0
    menuArray.forEach(item => {
        if(item.quantity){
            orderTotal += (item.quantity * item.price)
        }
    })

    let order = `
    <h3 class="order-title">Your Order</h3>
    <div class="order-items-container">
        ${orderItemsHtml}
    </div>
    <hr>
    <div class="total">
        <h3>Total Price:</h3>
        <p class="item-price total-price">$${orderTotal}</p>
    </div>
    <button class="complete">Complete order</button>
`

    orderContainer.innerHTML = order
    return orderContainer
}

function handleAddItem(id) {
    const targetItem = menuArray.filter(item => {
        return item.id == id 
    })[0]
    targetItem.quantity++
}

function handleRemoveItem(id) {
    const targetItem = menuArray.filter(item => {
        return item.id == id
    })[0]
    if(targetItem.quantity > 0){ 
        targetItem.quantity--
    }
}

function paymentHandling(e){
    e.preventDefault();

    const payFormData = new FormData(payForm);
    const name = payFormData.get("form-name");

    document.querySelector('.payment').style.display = 'none'
    orderContainer.style.display = `none`
    menu.innerHTML += `
        <div class="thx-message">
            Thanks ${name}! Your order is on its way!
        </div>`
    document.querySelector('.thx-message').style.display = `inline-block`
}

function render() {
    document.querySelector('.menu').innerHTML = getMenuHtml()
}