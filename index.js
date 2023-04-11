import { menuArray } from "./data.js";

function getMenuHtml() {
    let menuHtml = ``

    menuArray.forEach(item => {
        menuHtml += `
        <div class="item">
                <div class="item-emoji" id="${item.name}-emoji">${item.emoji}</div>
                <div class="item-text" id="${item.name}-text">
                    <h3>${item.name}</h3>
                    <p class="ingredients">${item.ingredients.join(', ')}</p>
                    <p>${item.price}</p>
                </div>
                <i class="fa-light fa-plus"></i>
            </div>
            <hr>`
    })
    return menuHtml
}

function render() {
    document.querySelector('.menu').innerHTML = getMenuHtml()
}

render()