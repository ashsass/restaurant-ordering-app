import { menuArray } from "./data.js";  
const payForm = document.querySelector("#payment-form");
const menu = document.querySelector(".menu")
const orderContainer = document.querySelector('.order')
const formCard = document.querySelector('#form-card')
const formCvv = document.querySelector('#form-cvv')
const thxMessage = document.querySelector('.thx-message')

document.addEventListener('click', function(e){
    if(e.target.dataset.item || e.target.dataset.add){
        if(thxMessage.style.display === `inline-block`) {
        } else {
            let target = e.target.dataset.item || e.target.dataset.add
            orderContainer.style.display = `flex`
            handleAddItem(target)
        }
    }else if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
    }else if(e.target.className === 'complete'){
       document.querySelector('.payment').style.display = 'flex'}
})

/*When the user submits the payment, the validate payment function will check if the card number and cvv number are in fact numbers and not other characters. If it returns true the payment will be handled by another function and will retrieve a thank you message. If not the error message will display telling the user to fix the card number
*/
payForm.addEventListener('submit', function(e){
    e.preventDefault()
    let isCardValid = validatePayment()
    if(isCardValid){
        paymentHandling()
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

function isNumber(input) {
    const values = /^[0-9]+$/
    return values.test(input) 
}

function showError(input, message) {
    const formValue = input.parentElement
    const error = formValue.querySelector('small')
    input.classList.toggle('error')
    error.textContent = message
}

function validatePayment() {
    let valid = false

    if(!isNumber(formCard.value)){
        showError(formCard, "Please enter a valid card number")
    } else if(!isNumber(formCvv.value)){
        showError(formCvv, "Please enter a valid CVV number")
    }else {
        valid = true
    }
    return valid
}

function paymentHandling(){
    const payFormData = new FormData(payForm);
    const customerName = payFormData.get("form-name");

    document.querySelector('.payment').style.display = 'none'
    orderContainer.style.display = `none`
    thxMessage.innerHTML += `
        Thanks ${customerName}! Your order is on its way!`
    thxMessage.style.display = `inline-block`
}

