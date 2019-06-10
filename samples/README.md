# Tradeprint Node.js SDK Code Samples

Welcome to the code samples repository. All of the sample follow the same initilisation procedure:
```javascript
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();
const orderService = new SDK.OrderService();
```
With those statements in place you can use the `productService` or the `orderService` to get specific `Request` objects and execute them.

## Styles of Asynchronous Execution

All asynchronous code in JavaScript needs to be handled in specific way compared to standard precedural code. 
This is not different in the Tradeprint SDK. It allows you to choose the method of handling requests using the same codebase.

### Async/Await

The preferred method is to use the `async`/`await` reserved statements. 
Please see [products/expected-delivery-date-async-await.js](products/expected-delivery-date-async-await.js) for the usage:
```javascript
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

(async() => {
    try {
        const response = await productService.getExpectedDeliveryDateRequest()
            .setProductId('PRD-SRJ3LY4F')
            .setServiceLevel('Saver')
            .setArtworkService('Just Print')
            .setProductionData({
                'Sides Printed': 'Double Sided',
                'Paper Type': '100gsm Premium Smooth White Paper',
                'Sets': '1'
            })
            .setQuantity(500)
            .setDeliveryAddressPostcode('POST CODE')
            .execute();

        console.log(response);
    } catch (err) {
        console.error(err);
    }
})();
```

### Promises

If you are using ECMAScript 2015 (ES6) and would like to use the native Promises you can use that as well.
Please see [products/expected-delivery-date-promises.js](products/expected-delivery-date-promises.js) for the usage:
```javascript
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

const response = productService.getExpectedDeliveryDateRequest()
    .setProductId('PRD-SRJ3LY4F')
    .setServiceLevel('Saver')
    .setArtworkService('Just Print')
    .setProductionData({
        'Sides Printed': 'Double Sided',
        'Paper Type': '100gsm Premium Smooth White Paper',
        'Sets': '1'
    })
    .setQuantity(500)
    .setDeliveryAddressPostcode('POST CODE');

response.execute()
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
```

### Callbacks

You can still use classic callbacks to handle the results of the SDK requests.
Please see [products/expected-delivery-date-callback.js](products/expected-delivery-date-callback.js) for the usage:
```javascript
const SDK = require('tradeprint-node-sdk');

SDK.setEnvironment(SDK.Environments.Sandbox);

SDK.setDebugging(true);
SDK.setCredentials('USERNAME', 'PASSWORD');

const productService = new SDK.ProductService();

const response = productService.getExpectedDeliveryDateRequest()
    .setProductId('PRD-SRJ3LY4F')
    .setServiceLevel('Saver')
    .setArtworkService('Just Print')
    .setProductionData({
        'Sides Printed': 'Double Sided',
        'Paper Type': '100gsm Premium Smooth White Paper',
        'Sets': '1'
    })
    .setQuantity(500)
    .setDeliveryAddressPostcode('POST CODE');

response.execute((err, response) => {
    if (err) {
        console.error(err);
    } else {
        console.log(response);
    }
});
```

## Specific Samples

The samples provided below reflect the calls available in the Tradeprint API (https://docs.sandbox.tradeprint.io).

### Orders

* [Submit New Order](orders/submit-new-order.js)
* [Validate Order](orders/validate-order.js)
* [Upload or Replace Artwork](orders/upload-replace-artwork.js)
* [Get Order Status by ID](orders/get-order-status-by-id.js)
* [Fetch Orders by References](orders/fetch-orders-by-reference.js)
* [Cancel an Order Item](orders/cancel-order-item.js)

### Products

* [Request Price Lists for Multiple Products](products/price-lists-multiple-products.js)
* [Request Price List for Single Product](products/price-list-single-product.js)
* [Get All Products Attributes](products/get-all-products-attributes.js)
* [Get Attributes for Specific Product](products/get-specific-product-attributes.js)
* [Request Product Quantities](products/product-quantities.js)
* [Get Expected Delivery Date](products/expected-delivery-date-async-await.js)

Please see the outlined [Request Price List for Single Product](products/price-list-single-product-outlined.js) 
and [Submit New Order](orders/submit-new-order-outlined.js) for
details about the objects created during the process without chaining setter calls.

## Production Environment

When you are ready to integrate your solution with the production Tradeprint API you can switch out the environment statement to:
```javascript
SDK.setEnvironment(SDK.Environments.Production);
```
All the requests within your code will now be calling the real ordering systems within Tradeprint.
