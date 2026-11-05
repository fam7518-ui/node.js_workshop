const { Product, Order} = require('../models/db');
const sendResponse = require('../utils/response');

// 1. ดึงข้อมูลสินค้าทั้งหมด (ไม่มี -> [] 200 | มีหลายรายการ -> [{...}] 200)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return sendResponse(res, 200, 'success', products);
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// 2. ดึงข้อมูลสินค้าตาม ID (ไม่มีรายการเดียว -> null 400 | มีรายการเดียว -> {...} 200)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return sendResponse(res, 400, 'Bad Request', null);
        }
        return sendResponse(res, 200, 'success', product);
    } catch (error) {
        return sendResponse(res, 400, 'Bad Request', null);
    }
};

// 3. เพิ่มสินค้าใหม่ (บันทึกสำเร็จ -> {...} 201)
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return sendResponse(res, 201, 'Created', newProduct);
    } catch (error) {
        return sendResponse(res, 400, 'Bad Request');
    }
};

// 4. สั่งซื้อและตัดสต็อก (บันทึกสำเร็จ -> {...} 201)
exports.createOrder = async (req, res) => {
    try {
        const { order_qty } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return sendResponse(res, 400, 'Bad Request', null);
        }

        if (product.stock < order_qty) {
            return sendResponse(res, 400, 'Bad Request');
        }

        product.stock -= order_qty;
        await product.save();

        // เพิ่มการบันทึกประวัติ Order ลง DB
        const newOrder = new Order({ product_id: product._id, qty: order_qty });
        await newOrder.save();

        return sendResponse(res, 201, 'Created', product);
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// 5. แก้ไขข้อมูลสินค้า (อัปเดตสำเร็จ -> {...} 200 หรือ 201)
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return sendResponse(res, 400, 'Bad Request', null);
        }
        return sendResponse(res, 200, 'success', updatedProduct);
    } catch (error) {
        return sendResponse(res, 400, 'Bad Request');
    }
};

// 6. ลบสินค้า (ลบสำเร็จ -> {... หรือข้อมูลที่ลบ} 200)
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return sendResponse(res, 400, 'Bad Request', null);
        }
        return sendResponse(res, 200, 'success', deletedProduct);
    } catch (error) {
        return sendResponse(res, 400, 'Bad Request');
    }
};

// 7. เพิ่ม: แสดง Order ทั้งหมดของ Product เฉพาะตัว (ตาม Flowchart)
exports.getOrdersByProduct = async (req, res) => {
    try {
        const orders = await Order.find({ product_id: req.params.id });
        return sendResponse(res, 200, 'success', orders);
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// 8. เพิ่ม: แสดง Order ทุกรายการในระบบ (ตาม Flowchart)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product_id');
        return sendResponse(res, 200, 'success', orders);
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};