//Add a feature so that on click the initial input value clears so the customer can input their information with ease

import { menuArray } from "./data.js";

document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        getOrderHtml(e.target.id)
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

function getOrderHtml() {

}

function render() {
    document.querySelector('.menu').innerHTML = getMenuHtml()
}

render()