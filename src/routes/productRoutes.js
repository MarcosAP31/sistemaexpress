const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');  // Importa method-override
const productController = require('../controllers/productController');
const path = require('path');
// ...
const oldImagePath = path.join(__dirname, '..', oldImage);
module.exports = function (upload) {
    // Incluye el middleware method-override en las rutas
    router.use(methodOverride('_method'));
    router.post('/', upload.single('Image'), productController.createProduct);
    router.get('/', productController.getAllProducts);
    router.get('/:id', productController.getProductById);
    router.put('/:id', upload.single('Image'), productController.updateProduct);
    router.delete('/:id', productController.deleteProduct);

    return router;
};