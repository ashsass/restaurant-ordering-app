import { menuArray } from "./data.js";

function getMenuHtml() {
    let menuHtml = ``

    menuArray.forEach(item => {
        menuHtml += `
        <div class="item-${item.name}">
                <div class="${item.name}-emoji">${item.emoji}</div>
                <div class="${item.name}-text">
                    <h4>${item.name}</h4>
                    <p>${item.ingredients}</p>
                    <p>${item.price}</p>
                </div>
                <i class="fa-light fa-plus"></i>
            </div>`
    })
    return menuHtml
}

function render() {
    document.querySelector('.root').innerHTML = getMenuHtml()
}

render()