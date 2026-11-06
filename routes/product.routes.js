const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth');

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', verifyToken, productController.createProduct);

router.get('/:id/orders', verifyToken, productController.getOrdersByProduct);

router.post('/:id/orders', verifyToken, productController.createOrder);

router.put('/:id', verifyToken, productController.updateProduct);

router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;