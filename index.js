import { menuArray } from "./data.js";  
const payForm = document.querySelector("#payment-form");
const menu = document.querySelector(".menu")
const orderContainer = document.querySelector('.order')

document.addEventListener('click', function(e){
    if(e.target.dataset.item || e.target.dataset.add){
        let target = e.target.dataset.item || e.target.dataset.add
        orderContainer.style.display = `flex`
        handleAddItem(target)
    }else if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
    }else if(e.target.className === 'complete'){
       document.querySelector('.payment').style.display = 'flex'
    }else if(e.target.className === 'pay-btn'){
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

function getOrderHtml() {
    //Get the order container HTML
    let order = `
    <h3 class="order-title">Your Order</h3>
    <div class="order-items-container">
    </div>
    <hr>
    <div class="total">
        <h3>Total Price:</h3>
        <p class="item-price total-price"></p>
    </div>
    <button class="complete">Complete order</button>`
    orderContainer.innerHTML = order
    
    //Iterate through the menu array to create the inner HTML for each item that is added by the uder
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

    //If the user deletes all items in their order hide the order container
    if(!orderTotal){
        orderContainer.style.display = 'none'
    }

    document.querySelector(".total-price").innerHTML = `$${orderTotal}`
    document.querySelector(".order-items-container").innerHTML = orderItemsHtml
    return orderContainer
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

