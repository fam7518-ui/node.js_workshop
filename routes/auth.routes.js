const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.put('/users/:id/approve', authController.approveUser);

router.get('/orders', verifyToken, productController.getAllOrders);

module.exports = router;