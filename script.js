const cart = document.querySelector('.cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const confirmOrderBtn = document.getElementById('confirm-order');

let total = 0;
let itemsInCart = [];




function changeImage(color, element) {
    // Encontrar el contenedor más cercano con la clase 'diseño'
    const productContainer = element.closest('.diseño');
    
    // Encontrar la imagen dentro del contenedor del producto
    const productImage = productContainer.querySelector('img.product');
    
    // Obtener la imagen correspondiente al color desde los atributos data-*
    const newImage = productContainer.getAttribute(`data-${color}`);
    
    // Si existe una imagen para el color, la cambiamos
    if (newImage) {
        productImage.src = newImage;
    } else {
        console.warn(`No se encontró imagen para el color: ${color}`);
    }
}




// Variables globales para el tamaño y color seleccionados
let selectedSize = '';
let selectedColor = 'Negro'; // Valor inicial predeterminado

// Función para seleccionar el talle
function selectSize(size) {
    selectedSize = size;
}

// Función para cambiar la imagen del producto según el color seleccionado
function changeImage(color, element) {
    // Encontrar el contenedor más cercano con la clase 'diseño'
    const productContainer = element.closest('.diseño');
    
    // Encontrar la imagen dentro del contenedor del producto
    const productImage = productContainer.querySelector('img.product');
    
    // Actualizar el color seleccionado globalmente
    selectedColor = color.charAt(0).toUpperCase() + color.slice(1); // Capitalizar el primer carácter del color

    // Cambiar la imagen según el color seleccionado
    const newImage = productContainer.getAttribute(`data-${color}`);
    if (newImage) {
        productImage.src = newImage;
    } else {
        console.warn(`No se encontró imagen para el color: ${color}`);
    }
}

// Función para mostrar el carrito cuando se selecciona un producto
function showCart() {
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const productName = document.getElementById('product-image').getAttribute('data-name');
    const productPrice = parseInt(document.getElementById('product-image').getAttribute('data-price'));

    // Crear el elemento del carrito con el producto seleccionado
    const li = document.createElement('li');
    li.textContent = `${productName} - Talle: ${selectedSize}, Color: ${selectedColor} - $${productPrice}`;
    cartItems.appendChild(li);

    // Añadir el producto al array de items para el mensaje
    itemsInCart.push(`${productName} - Talle: ${selectedSize}, Color: ${selectedColor} - $${productPrice}`);

    total += productPrice;
    cartTotal.textContent = total;

    // Mostrar carrito y botón de confirmación
    cart.style.display = 'block';
    document.getElementById('confirm-order').style.display = 'block';
}


// Función para vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Vaciar el contenido del carrito y los items en el array
    cartItems.innerHTML = '';
    itemsInCart = [];
    total = 0;
    cartTotal.textContent = total;
    document.getElementById('confirm-order').style.display = 'none'; // Ocultar botón de confirmación

    // Ocultar el carrito cuando esté vacío
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
});

// Función para confirmar el pedido y enviar los detalles por WhatsApp
document.getElementById('confirm-order').addEventListener('click', () => {
  // Crear el texto con los detalles del pedido
  const orderText = encodeURIComponent(`Hola, me gustaría confirmar el siguiente pedido:\n\n${itemsInCart.join('\n')}\n\nTotal: $${total}`);
  
  // Número de WhatsApp, incluyendo el código de país
  const whatsappNumber = "5491162158222"; // Reemplaza con tu número de WhatsApp
  
  // Generar la URL de WhatsApp con el texto del pedido
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${orderText}`;
  
  // Abrir la URL de WhatsApp en una nueva pestaña
  window.open(whatsappUrl, '_blank');
});




// Seleccionar la barra de búsqueda y los contenedores de productos
const searchBar = document.querySelector('#search-bar');
const products = document.querySelectorAll('.diseño'); // Selecciona los contenedores de productos

// Añadir un evento de entrada para la barra de búsqueda
searchBar.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

  products.forEach(product => {
      const productName = product.querySelector('[data-name]').getAttribute('data-name').toLowerCase(); // Obtener el nombre del producto

      // Verificar si el nombre del producto comienza con el texto ingresado
      if (productName.startsWith(searchText)) {
          product.style.display = 'block'; // Mostrar el contenedor del producto si coincide
      } else {
          product.style.display = 'none'; // Ocultar el contenedor del producto si no coincide
      }
  });
});




