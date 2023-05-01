//Add a feature so that on click the initial input value clears so the customer can input their information with ease

import { menuArray } from "./data.js";  
const orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        handleAddItem(e.target.dataset.item)
        getOrderHtml(e.target.dataset.item)
    }
    else if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
    }
})

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
                <hr>
            </div>
            `
    })
    return menuHtml
}

function getOrderHtml(id) {
    let orderHtml = ``
    //check if the array has the corresponding item id and if not push it to the array

    if (!orderArray.includes(id)){
        orderArray.push(id)
    }
    else if(orderArray.includes(id)){
        if(menuArray[id].quantity === 0){
            orderArray.splice("id")
            //NOTE TO SELF - !!!!
            //May need to have the container with order disappear when the orderArray is empty - work on that later
        }
    }
        //iterate over the array and pull the id that is present to render the order html. This will allow us to exlude multiple orders. Will need to update a count in someway
        orderArray.forEach(item => {
            orderHtml +=
                `<div class="order-item-${menuArray[item].name}" id="${id}">
                    <h3 class="order-name">${menuArray[item].name}</h3>
                    <button class="remove" data-remove="${menuArray[item].id}">remove</button>
                    <p class="quantity">${menuArray[item].quantity}</p>
                    <p class="item-price order-item-price">$${menuArray[item].price}</p>
                </div>`
        })
        return document.querySelector('.order-items-container').innerHTML = orderHtml
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
    getOrderHtml(id)
}

function render() {
    document.querySelector('.menu').innerHTML = getMenuHtml()
}

render()

//Having trouble removing the div completely when the quantity hits 0