const pendingOrdersTable = document.getElementById('pendingOrders').getElementsByTagName('tbody')[0];
const completedOrdersTable = document.getElementById('completedOrders').getElementsByTagName('tbody')[0];
const completedMessage = document.getElementById('completedMessage');

function getParameterByName(name) {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get(name);
}

const completedOrders = []; // Almacena las órdenes completadas
function marcarOrdenComoCompletada(index) {
const completedOrder = products.splice(index, 1); // Remover la orden de las órdenes pendientes
completedOrders.push(completedOrder[0]); // Agregar la orden completada a la lista de órdenes completadas
renderOrderList(); // Actualizar la lista de órdenes pendientes
renderCompletedOrders(); // Actualizar la lista de órdenes completadas
}

function renderCompletedOrders() {
const completedOrdersTable = document.getElementById('completedOrders').getElementsByTagName('tbody')[0];
completedOrdersTable.innerHTML = '';
completedOrders.forEach((completedOrder, index) => {
    const orderRow = document.createElement('tr');
    const productCell = document.createElement('td');
    productCell.textContent = completedOrder.name;
    const quantityCell = document.createElement('td');
    quantityCell.textContent = completedOrder.quantity;
    
    // Agrega una celda para el estado y establece su contenido en "COMPLETA"
    const stateCell = document.createElement('td');
    stateCell.textContent = 'COMPLETA';
    
    orderRow.appendChild(productCell);
    orderRow.appendChild(quantityCell);
    orderRow.appendChild(stateCell);
    
    completedOrdersTable.appendChild(orderRow);
});
// Muestra el mensaje si todas las órdenes están completadas
if (completedOrders.length > 0) {
    completedMessage.style.display = 'block';
}
}

function renderOrdersFromQueryString() {
    const productos = getParameterByName('productos');
    if (productos) {
        const productArray = JSON.parse(decodeURIComponent(productos));
        productArray.forEach(productInfo => {
            const [cantidad, producto] = productInfo.split(' x ');
            const orderRow = document.createElement('tr');
            const productCell = document.createElement('td');
            productCell.textContent = producto;
            const quantityCell = document.createElement('td');
            quantityCell.textContent = cantidad;

            // Agregar un botón para marcar como completada
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Marcar como Completada';
            completeButton.addEventListener('click', () => {
                // Mover la fila a la sección de órdenes completadas
                completedOrdersTable.appendChild(orderRow);
                // Eliminar el botón de completado para evitar duplicados
                orderRow.removeChild(completeButton);
                // Actualizar el mensaje si todas las órdenes están completadas
                if (pendingOrdersTable.children.length === 0) {
                    completedMessage.style.display = 'block';
                }
            });
            
            orderRow.appendChild(productCell);
            orderRow.appendChild(quantityCell);
            orderRow.appendChild(completeButton);

            // Agregar la fila a la sección de órdenes pendientes
            pendingOrdersTable.appendChild(orderRow);
        });
    }
}
renderOrdersFromQueryString();