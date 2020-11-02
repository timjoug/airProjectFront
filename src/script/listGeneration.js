export default {
    methods: {

        /**
         * This function will generate a list, able to match with the stock data table pattern .
         * @param {Object} objectInput - Source object for the stock List Generation
         */
        generateStocksTable(objectInput) {
            let stockList = [],
                stockFlatList = [],
                productList = [];
            objectInput.forEach(inputItem => {
                inputItem.stock.forEach(stockItem => {
                    if (!productList.includes(stockItem.productId)) {
                        productList.push(stockItem.productId);
                        stockList.push({ "productId": stockItem.productId, "vaQuantity": 0, "roncqQuantity": 0, "lesquinQuantity": 0 });
                    }
                    stockFlatList.push({ "productId": stockItem.productId, "storeId": inputItem.id, "quantity": stockItem.quantity });
                })
            });

            stockList.forEach(finalItem => {
                stockFlatList.forEach(flatItem => {
                    if (finalItem.productId === flatItem.productId) {
                        if (flatItem.storeId === "Villeneuve") { finalItem.vaQuantity = flatItem.quantity; } else if (flatItem.storeId === "Roncq") { finalItem.roncqQuantity = flatItem.quantity; } else if (flatItem.storeId === "Lesquin") { finalItem.lesquinQuantity = flatItem.quantity; }
                    }
                })
            })
            return stockList;
        },

        /**
         * This function will generate a list, able to match with the orders data table pattern .
         * @param {Object} objectInput - Source object for the orders List Generation
         */
        generateOrdersTable(objectInput) {
            let orderList = [];
            objectInput.forEach(orderItem => {
                let basketString = '';
                orderItem.basket.forEach(basketItem => {
                    basketString = basketString.concat(', ', basketItem.quantity.toString().concat(' ', 'x ', basketItem.productId));
                });
                basketString = basketString.slice(2);
                orderList.push({ "id": orderItem.id, "customerId": orderItem.customerId, "products": basketString });
            });
            return orderList;
        }
    }
}