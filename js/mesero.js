//productos disponibles con sus precios
const productosDisponibles = {
    "Tartaleta de fresa": 2.00,
    "Brownie de chocolate": 2.50,
    "Tarta de cereza": 3.00,
    "cheescake-3sabores": 3.00,
    "chesscake mora": 3.50,
    "Cupcakes de oreo": 2.50,
    "tartaleta-frutas": 3.00,
    "mini-pastel de fresa y kiwi": 4.00,
    "pastel de chocolate": 4.00,
    "Café": 1.50,
    "Té": 1.00,
    "chocolatada": 3.00,
    "frozen de cafe": 3.00,
    "cafe helado": 2.50,
    "pumpkin de chocolate": 3.50,
    "frescos naturales": 2.50,
    "frozen de caramelo": 3.50,
    "batido de oreo": 3.50,
    "batido de fresa y crema batida": 3.00,
    "cafe con malvaviscos": 2.50
};

//funcion agregar producto

const products = [];

function agregarProducto() {
    const productSelect = document.getElementById('product');
    const productName = productSelect.value;
    const productPrice = productosDisponibles[productName];
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    if (productPrice !== undefined && quantity > 0) {
        products.push({ name: productName, price: productPrice, quantity });
        renderOrderList();
    }

    

    // Limpiar el campo de cantidad después de agregar un producto
    document.getElementById('quantity').value = 1;

    // Actualizar el total de la orden
    updateTotal();
}

function renderOrderList() {
    const currentOrder = document.getElementById('currentOrder');
    currentOrder.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.quantity} x ${product.name} - $${(product.price * product.quantity).toFixed(2)}`;
        currentOrder.appendChild(listItem);
    });
}

function updateTotal() {
    const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    document.getElementById('total').textContent = `$${totalAmount.toFixed(2)}`;
}

function generarTicket() {
    const ticketBody = document.getElementById('ticketBody');
    ticketBody.innerHTML = '';

    const ticketTotal = document.getElementById('ticketTotal');
    const ticketTable = document.getElementById('ticketTable');

    let totalAmount = 0;

    products.forEach(product => {
        const total = product.price * product.quantity;
        totalAmount += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        ticketBody.appendChild(row);
    });

    ticketTotal.textContent = `$${totalAmount.toFixed(2)}`;
    ticketTable.style.display = 'block'; // Mostrar la tabla

    //estilos 
    ticketTable.style.fontFamily = 'Arial, sans-serif';
    ticketTable.style.border = '2px solid #000';
    ticketTable.style.padding = '10px';
    ticketTable.style.backgroundColor = '#fff';
}


function enviarOrdenAlCocinero() {
    // Crear un arreglo de productos para enviar al Cocinero
    const productosOrden = products.map(product => `${product.quantity} x ${product.name}`);
    
    // Codificar el arreglo como JSON
    const productosJSON = JSON.stringify(productosOrden);
    
    // Construir la URL con los productos
    const cocineroURL = `cocinero.html?productos=${encodeURIComponent(productosJSON)}`;
    
    // Abrir la URL en una nueva ventana
    window.open(cocineroURL, '_blank');

    // Limpiar la orden actual después de enviarla al Cocinero
    products.length = 0;
    renderOrderList();
    updateTotal();
}

// Llena el select de productos en el formulario con las opciones disponibles
document.addEventListener('DOMContentLoaded', function () {
    const productSelect = document.getElementById('product');
    for (const product in productosDisponibles) {
        const option = document.createElement('option');
        option.value = product;
        option.textContent = `${product} $${productosDisponibles[product].toFixed(2)}`;
        productSelect.appendChild(option);
    }
});