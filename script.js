const addToCartButtons = document.querySelectorAll('.add-to-cart');
const itemsDiv = document.getElementById('items');
const subtotalDiv = document.getElementById('subtotal');
const taxDiv = document.getElementById('tax');
const totalDiv = document.getElementById('total');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let subtotal = 0;

let cartItems = []; // Variable para almacenar los artículos en el carrito

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
        subtotal += price;
        cartItems.push(price); // Agregar el precio del artículo al arreglo de items en el carrito
        button.classList.add('added'); // Marcar el botón como añadido al carrito
        updateCart();
    });
});

// Agregar un event listener al botón de búsqueda
searchButton.addEventListener('click', function() {
    // Obtener el valor ingresado en el input de búsqueda
    const searchTerm = searchInput.value.toLowerCase();

    // Filtrar los productos que coincidan con el término de búsqueda
    const filteredProducts = Array.from(document.querySelectorAll('.product-card')).filter(product => {
        // Obtener el nombre del producto y convertirlo a minúsculas para la comparación
        const productName = product.querySelector('h3').textContent.toLowerCase();
        // Verificar si el nombre del producto contiene el término de búsqueda
        return productName.includes(searchTerm);
    });

    // Ocultar todos los productos
    document.querySelectorAll('.product-card').forEach(product => {
        product.style.display = 'none';
    });

    // Mostrar solo los productos filtrados
    filteredProducts.forEach(product => {
        product.style.display = 'block';
    });
});

function updateCart() {
    const tax = subtotal * 0.16; // 16% de impuesto
    const total = subtotal + tax;
    subtotalDiv.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    taxDiv.textContent = `Iva (16%): $${tax.toFixed(2)}`;
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    
    // Mostrar los artículos en el carrito
    itemsDiv.innerHTML = '';
    cartItems.forEach(item => {
        itemsDiv.innerHTML += `<p>Articulo $${item.toFixed(2)}</p>`;
    });
}

function realizarCompra() {
    // Mostrar la ventana modal con las camisetas compradas
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';

    // Obtener el contenedor para las camisetas compradas
    const purchasedItemsDiv = document.getElementById('purchased-items');

    // Limpiar el contenido del contenedor de camisetas compradas
    purchasedItemsDiv.innerHTML = '';

    // Recorrer los botones "add-to-cart" para determinar qué artículos se han comprado
    addToCartButtons.forEach(button => {
        // Verificar si el artículo asociado a este botón se ha añadido al carrito
        if (button.classList.contains('added')) {
            const price = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
            const itemName = button.previousElementSibling.previousElementSibling.textContent;
            const itemImageSrc = button.parentElement.querySelector('img').src;
            purchasedItemsDiv.innerHTML += `<div class="purchased-item">
            <img src="${itemImageSrc}" alt="${itemName}">
            <p>${itemName} - $${price.toFixed(2)}</p>
        </div>`;
        }
    });

    // Limpiar el carrito después de realizar la compra
    cartItems = [];

    // Reiniciar subtotal después de cada compra
    subtotal = 0;

    // Limpiar el estado "added" de todos los botones después de realizar la compra
    addToCartButtons.forEach(button => {
        button.classList.remove('added');
    });

    // Mostrar el mensaje de compra realizada (opcional)
    alert('Compra realizada');
}

document.getElementById('click-me').addEventListener('click', function() {
    realizarCompra();
});

// Cerrar la ventana modal al hacer clic en el botón de cierre
var closeButton = document.querySelector(".close");
var modal = document.getElementById("cart-modal");

closeButton.addEventListener("click", function() {
    modal.style.display = "none";
});
