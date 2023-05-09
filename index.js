import { menuArray } from "./data.js";  
const payForm = document.querySelector("#payment-form");
const menu = document.querySelector(".menu")
const orderContainer = document.querySelector('.order')

document.addEventListener('click', function(e){
    //When user adds an item through the menu or increments their item in the order menu the order container appears, items increment, and the order html updates
    if(e.target.dataset.item || e.target.dataset.add){
        let target = e.target.dataset.item || e.target.dataset.add
        orderContainer.style.display = `flex`
        handleAddItem(target)
    }
    //When a user removes an item in the order menu
    else if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
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

function render() {
    return document.querySelector('.menu').innerHTML = getMenuHtml()
}

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



function getOrderHtml() {
    //Get the order container HTML
    let order = `
    <h3 class="order-title">Your Order</h3>
    <div class="order-items-container">
    </div>
    <hr>
    <div class="total">
        <h3>Total Price:</h3>
        <p class="item-price total-price">$</p>
    </div>
    <button class="complete">Complete order</button>`
    orderContainer.innerHTML = order
    




    let orderTotal = 0
    let orderItemsHtml = ``
    menuArray.forEach(item => {
        if(item.quantity > 0){
            orderTotal += (item.quantity * item.price)
            orderItemsHtml +=
            `<div class="order-item ${item.name}" id="${item.id}">
                <h3 class="order-name">${item.name}</h3>
                <button class="remove" data-remove="${item.id}">-</button>
                <p class="quantity">Quantity: ${item.quantity}</p>
                <button class="add" data-add="${item.id}">+</button>
                <p class="item-price order-item-price">Price: $${item.price * item.quantity}</p>
            </div>`
        }
    })

    if(!orderTotal){
        orderContainer.style.display = 'none'
    }

    document.querySelector(".total-price").innerHTML = orderTotal
    const orderItemsContainer = document.querySelector(".order-items-container")
    orderItemsContainer.innerHTML = orderItemsHtml
    return orderContainer
}






function handleAddItem(id) {
    const targetItem = menuArray.filter(item => {
        return item.id == id 
    })[0]
    targetItem.quantity++
    getOrderHtml()
}

function handleRemoveItem(id) {
    const targetItem = menuArray.filter(item => {
        return item.id == id
    })[0]
    if(targetItem.quantity > 0){ 
        targetItem.quantity--
    }
    getOrderHtml()
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

