// models/db.js

// 1. นำเข้า mongoose ซึ่งเป็นเครื่องมือสำคัญสำหรับการเชื่อมต่อและจัดการฐานข้อมูล MongoDB
const mongoose = require('mongoose');

// 2. สร้างโครงสร้าง (schema) สำหรับข้อมูลผู้ใช้ (User)
const userSchema = new mongoose.Schema({
    // ฟิลด์ username: ชนิดตัวอักษร (String) และบังคับว่าต้องกรอก (required: true)
    username: { type: String, required: true, unique: true }, 
    
    // ฟิลด์ password: ชนิดตัวอักษร (String) และบังคับว่าต้องกรอก (required: true)
    password: { type: String, required: true },

    // ฟิลล์ is_approved: ชนิดข้อมูลค่าความจริง (Boolean) และค่าเริ่มต้นคือ false (default: false) แปลว่า สมัครปุ้บจะยังใช้งานไม่ได้ ต้องรอการอนุมัติจากผู้ดูแลระบบก่อน
    is_approved: { type: Boolean, default: false }
});

// 3. สร้างโครงสร้างสำหรับตารงสินค้า (Product)
const productSchema = new mongoose.Schema({
    // ฟิลด์ name: ชนิดตัวอักษร (String) และบังคับว่าต้องกรอก (required: true)
    name: { type: String, required: true },

    // ฟิลล์ stock: ชนิดตัวเลข (Number) และบังคับว่าต้องกรอก (required: true) ถ้าไม่กรอกจะถือว่าเป็นสินค้าที่ไม่มีสต็อก default: 0
    stock: { type: Number, required: true, default: 0 },

    // ฟิลล์ price: ชนิดตัวเลข (Number) และบังคับว่าต้องกรอก (required: true)
    price: { type: Number, required: true }
});

// 4. สร้างโครงสร้างสำหรับตาราง "คำสั่งซื้อ" (Order)
const orderSchema = new mongoose.Schema({
    // ฟิลล์ product_id: เก็บ ID สินค้า ชนิดข้อมูลเป็น ObjectID พิเศษของ MongoDB  โดยอ้างอิง (reference) ไปยังโมเดล Product
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},

    // ฟิลล์ qty: จำนวนสินค้าที่สั่งซื้อ ชนิดตัวเลข (Number) และบังคับว่าต้องกรอก (required: true)
    qty: { type: Number, required: true },
});

// 5. นำโครงสร้างทีทั้ง 3 มาสร้างเป็นโมเดล (Model) เพื่อให้สามารถใช้งานกับฐานข้อมูลได้
module.exports = {
    User: mongoose.model('User', userSchema), // โมเดลสำหรับผู้ใช้
    Product: mongoose.model('Product', productSchema), // โมเดลสำหรับสินค้า
    Order: mongoose.model('Order', orderSchema) // โมเดลสำหรับคำสั่งซื้อ       
};