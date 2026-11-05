const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth');

// 1. สมัครสมาชิก [POST] /api/v1/register
router.post('/register', authController.register);

// 2. เข้าสู่ระบบ [POST] /api/v1/login
router.post('/login', authController.login);

// 3. อนุมัติผู้ใช้งาน [PUT] /api/v1/users/:id/approve
router.put('/users/:id/approve', authController.approveUser);

// 4. แสดง Order ทุกรายการในระบบ [GET] /api/v1/orders (เพิ่มตาม Flowchart)
router.get('/orders', verifyToken, productController.getAllOrders);

module.exports = router;