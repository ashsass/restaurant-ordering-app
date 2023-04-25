import { menuArray } from "./data.js";

function getMenuHtml() {
    let menuHtml = ``

    menuArray.forEach(item => {
        menuHtml += `
        <div class="item">
                <div class="item-emoji" id="${item.name}-emoji">${item.emoji}</div>
                <div class="item-text" id="${item.name}-text">
                    <h3>${item.name}</h3>
                    <p class="item-ingredients">${item.ingredients.join(', ')}</p>
                    <p class="item-price">${item.price}</p>
                </div>
                <button class="item-add">
                    <i class="fa-light fa-plus"></i>
                </button>
                <hr>
            </div>
            `
    })
    return menuHtml
}

function render() {
    document.querySelector('.menu').innerHTML = getMenuHtml()
}

render()