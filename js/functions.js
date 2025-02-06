//Variables

let allProductsBox = document.querySelector('.main__products');
let containerBuyCart = document.querySelector('.cart__container');
let priceTotal = document.querySelector('.main__cart--price');
let amountProd = document.querySelector('.count_products');

let buyThings = [];
let totalProducts = 0;
let countProduct = 0;

//Functions
loadEventListeners();
function loadEventListeners(){
    allProductsBox.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('box__btn')) {
    const selectProduct = e.target.parentElement;
    readContent(selectProduct);
    }
    
}

function deleteProduct(e){
    if (e.target.classList.contains('cart__delete--icon')) {
        const deleteId = e.target.getAttribute('data-id');
        
        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalProducts = totalProducts - priceReduce;
                totalProducts = totalProducts.toFixed(2);
            }
        })
        buyThings = buyThings.filter(product => product.id !== deleteId);

        countProduct--;
    }
    loadHtml();
}

function readContent(product) {
    const infoProduct = {
        image: product.querySelector('img').src,
        title: product.querySelector('.box__title').textContent,
        price: product.querySelector('span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalProducts = parseFloat(totalProducts) + parseFloat(infoProduct.price);
    totalProducts = totalProducts.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const prod = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        buyThings = [...prod];
    } else {
        buyThings = [...buyThings, infoProduct];
        countProduct++;
    }
    
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const {image,title,price,amount,id} = product;
        const row = document.createElement('div');
        row.classList.add('cart__article');
        row.innerHTML = `
        <div class="cart__article">
                        <img src="${image}" alt="img" class="cart__article--img"/>
                        <div class="cart__article--box">
                            <h4 class="cart__article--txt">${title}</h4>
                            <p>$<span class="cart__article--txt">${price}</span><p>
                            <h6 class="cart__article--amount">${amount}</h6>
                            <i class="cart__icon"><img src="img/Quitar.png" alt="Icono Quitar" class="cart__delete--icon" data-id="${id}"/></i>
                        </div>  
                    </div> 
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalProducts;

        amountProd.innerHTML = countProduct;
    });
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}

//carrito
const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector('.main__cart');

cartIcon.addEventListener('click', () => {
    cart.classList.add("show");
});

const closeButton = document.querySelector('.main__cart--close');

closeButton.addEventListener('click', closeCart);

function closeCart() {
    cart.classList.remove("show");
}



