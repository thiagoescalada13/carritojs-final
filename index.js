
// VARIABLES

let allContainerCart = document.querySelector('.products')

let containerBuyCart = document.querySelector('.card-items')

let priceTotal = document.querySelector('.price-total')

let amountTotal = document.querySelector('.count-product')

let products = document.querySelector('.products')

let buyThings = []
let totalCard = 0
let countProduct = 0


// FUNCIONES
loadEventListener()
function loadEventListener() {
    allContainerCart.addEventListener('click', addProduct)
    containerBuyCart.addEventListener('click', deleteProduct)

}

const getProducts = async () => {
    const response = await fetch("productos.json")
    const data = await response.json()

    data.forEach((product) => {
        let cart = document.createElement("div")
        cart.className = "carts"
        cart.innerHTML = `
<div>
                <img src="${product.imagen}" alt="">
                <p><span>${product.precio}</span>$</p>
                </div>
                <p class="title">${product.titulo}</p>
                <a href="" data-id="${product.id}" class="btn-add-cart">AÑADIR</a>
`

        products.appendChild(cart)

    })

}

getProducts()

function addProduct(e) {
    e.preventDefault()
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement
        readTheContent(selectProduct)
        let agregado = localStorage.setItem(`PRODUCTO AGREGADO ${Math.random(3).toFixed(2)}`, Math.random(2))
        Toastify({

            text: "Se agrego un producto",
            
            duration: 3000,

            style: {
                background: "green",
              }
            }).showToast();
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id')

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount)
                totalCard = totalCard - priceReduce
                totalCard = totalCard.toFixed(2)
                console.log(`Producto ${JSON.stringify(buyThings)} ha sido BORRADO`)
            }
            let borrado = localStorage.setItem(`PRODUCTO BORRADO ${Math.random(3).toFixed(2)}`, Math.random(2))
        })
        buyThings = buyThings.filter(product => product.id !== deleteId)
        countProduct--
        Toastify({

            text: "Se elimino un producto",
            
            duration: 3000,

            style: {
                background: "red",
              }
            }).showToast();
    }
    loadHtml()
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    let datoCompra = localStorage.setItem(infoProduct.title, JSON.stringify(infoProduct))


    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price)
    totalCard = totalCard.toFixed(2)

    const exist = buyThings.some(product => product.id === infoProduct.id)
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++
                return product
            } else {
                return product
            }
        })
        buyThings = [...pro]
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++
    }

    console.log('Se ha agregado ' + infoProduct.title)
    console.log(JSON.stringify(infoProduct))
    loadHtml()
}



function loadHtml() {
    clearHtml()
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product
        const row = document.createElement('div')
        row.classList.add('item')
        row.innerHTML = `
        <img src="${image}" alt="">
        <div class="item-content">
            <h5>${title}</h5>
            <h5 class="cart-price">${price}</h5>
            <h6>Amount:${amount}</h6>
        </div>
        <span class="delete-product" data-id="${id}">X</span>
        `
        containerBuyCart.appendChild(row)

        priceTotal.innerHTML = totalCard

        amountTotal.innerHTML = countProduct
    });


}

function clearHtml() {
    containerBuyCart.innerHTML = ''
}