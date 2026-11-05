const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth');

// 1. ดึงสินค้าทั้งหมด [GET] /api/v1/products
router.get('/', productController.getProducts);

// 2. ดึงสินค้าตาม ID [GET] /api/v1/products/:id
router.get('/:id', productController.getProductById);

// 3. เพิ่มสินค้า [POST] /api/v1/products
router.post('/', verifyToken, productController.createProduct);

// 4. แสดง Order ทั้งหมดของ Product เฉพาะตัว [GET] /api/v1/products/:id/orders (เพิ่มตาม Flowchart)
router.get('/:id/orders', verifyToken, productController.getOrdersByProduct);

// 5. สั่งซื้อสินค้า (เพิ่ม Order ใน Product) [POST] /api/v1/products/:id/orders
router.post('/:id/orders', verifyToken, productController.createOrder);

// 6. แก้ไขรายการ Product [PUT] /api/v1/products/:id
router.put('/:id', verifyToken, productController.updateProduct);

// 7. ลบรายการ Product [DELETE] /api/v1/products/:id
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;