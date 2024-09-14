// Variables globales para el tamaño y color seleccionados
let selectedSize = '';
let selectedColor = 'Negro'; // Valor inicial predeterminado

// Seleccionar el carrito, elementos del carrito y total
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const confirmOrderBtn = document.getElementById('confirm-order');

// Función para seleccionar el talle y agregar la clase .selected dentro del contenedor del producto correspondiente
function selectSize(size, element) {
    // Encontrar el contenedor más cercano con la clase 'diseño'
    const productContainer = element.closest('.diseño');

    // Eliminar la clase 'selected' solo de los talles dentro del contenedor actual
    productContainer.querySelectorAll('.size').forEach(el => el.classList.remove('selected'));

    // Agregar la clase 'selected' al talle seleccionado dentro del contenedor actual
    element.classList.add('selected');

    // Actualizar el tamaño seleccionado globalmente
    selectedSize = size;
}

// Función para cambiar el color y agregar la clase .selected dentro del contenedor del producto correspondiente
function changeImage(color, element) {
    // Encontrar el contenedor más cercano con la clase 'diseño'
    const productContainer = element.closest('.diseño');
    
    // Cambiar la imagen del producto según el color seleccionado
    const productImage = productContainer.querySelector('img.product');
    const newImage = productContainer.getAttribute(`data-${color}`);
    if (newImage) {
        productImage.src = newImage;
    }

    // Eliminar la clase 'selected' solo de los colores dentro del contenedor actual
    productContainer.querySelectorAll('.colorB, .colorW').forEach(el => el.classList.remove('selected'));

    // Agregar la clase 'selected' al color seleccionado dentro del contenedor actual
    element.classList.add('selected');

    // Actualizar el color seleccionado globalmente
    selectedColor = color.charAt(0).toUpperCase() + color.slice(1);
}

// Variable para almacenar los items en el carrito y el total
let itemsInCart = [];
let total = 0;

// Función para mostrar el carrito al presionar el botón de carrito
function showCart(element) {
    // Encontrar el contenedor más cercano con la clase 'diseño'
    const productContainer = element.closest('.diseño');

    // Obtener la imagen y atributos del producto dentro del contenedor
    const productImage = productContainer.querySelector('img.product');
    const productName = productImage.getAttribute('data-name');
    const productPrice = parseInt(productImage.getAttribute('data-price'));

    // Obtener el talle y el color seleccionados
    const selectedSizeElement = productContainer.querySelector('.size.selected');
    const selectedColor = productContainer.querySelector('.colorB.selected') ? 'Negro' : 'Blanco';

    // Verificar si se ha seleccionado un talle
    if (!selectedSizeElement) {
        alert("Por favor selecciona un talle.");
        return;
    }

    // Crear el elemento del carrito con el producto seleccionado
    const li = document.createElement('li');
    li.textContent = `${productName} - Talle: ${selectedSizeElement.textContent}, Color: ${selectedColor} - $${productPrice}`;
    cartItems.appendChild(li);

    // Añadir el producto al array de items para el mensaje (si es necesario)
    itemsInCart.push(`${productName} - Talle: ${selectedSizeElement.textContent}, Color: ${selectedColor} - $${productPrice}`);

    // Actualizar el total del carrito
    total += productPrice;
    cartTotal.textContent = total;

    // Mostrar carrito y botón de confirmación
    document.getElementById('cart').style.display = 'block';
    confirmOrderBtn.style.display = 'block';
}

// Función para vaciar el carrito
clearCartBtn.addEventListener('click', function() {
    // Vaciar el contenido del carrito y los items en el array
    cartItems.innerHTML = '';
    itemsInCart = [];
    total = 0;
    cartTotal.textContent = total;
    confirmOrderBtn.style.display = 'none'; // Ocultar botón de confirmación

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




