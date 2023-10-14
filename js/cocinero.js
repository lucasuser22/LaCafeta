const pendingOrdersTable = document.getElementById('pendingOrders').getElementsByTagName('tbody')[0];

function getParameterByName(name) {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get(name);
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
            orderRow.appendChild(productCell);
            orderRow.appendChild(quantityCell);
            pendingOrdersTable.appendChild(orderRow);
        });
    }
}

renderOrdersFromQueryString();