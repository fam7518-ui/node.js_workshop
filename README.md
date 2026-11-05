# Seller Backend API (Node.js Workshop)

ระบบ Backend API สำหรับจัดการร้านค้า สินค้า และคำสั่งซื้อ พัฒนาด้วย Node.js, Express และ MongoDB (Mongoose) ตามโครงสร้างสถาปัตยกรรมแบบ MVC Pattern

## 🚀 Tech Stack
* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose**
* **JWT (JSON Web Token)** & **bcryptjs**

## 📌 Main Features & API Endpoints

### 🔑 Auth & User Management
* `POST /api/v1/register` - สมัครสมาชิกใหม่
* `POST /api/v1/login` - เข้าสู่ระบบรับ JWT Token
* `PUT /api/v1/users/:id/approve` - อนุมัติสิทธิ์ผู้ใช้งาน (is_approved)

### 📦 Product Management
* `GET /api/v1/products` - ดึงรายการสินค้าทั้งหมด (Public)
* `GET /api/v1/products/:id` - ดึงรายละเอียดสินค้าตาม ID (Public)
* `POST /api/v1/products` - เพิ่มสินค้าใหม่ (Protected)
* `PUT /api/v1/products/:id` - แก้ไขข้อมูลสินค้า (Protected)
* `DELETE /api/v1/products/:id` - ลบรายการสินค้า (Protected)

### 🛒 Order & Stock Control
* `POST /api/v1/products/:id/orders` - สั่งซื้อสินค้าพร้อมตรวจสอบและตัดสต็อก (Protected)
* `GET /api/v1/products/:id/orders` - ดูรายการ Order ทั้งหมดของสินค้าเฉพาะตัว (Protected)
* `GET /api/v1/orders` - ดูรายการ Order ทุกรายการในระบบ (Protected)

## 🛠️ How to Run
```bash
# 1. Install Dependencies
npm install

# 2. Start Server
node app.js
