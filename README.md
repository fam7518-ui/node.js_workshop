# 🛒 Seller Backend API (Node.js Workshop)

ระบบ RESTful Backend API สำหรับจัดการผู้ใช้งาน ร้านค้า สินค้า และคำสั่งซื้อ พัฒนาด้วย Node.js, Express.js และ MongoDB (Mongoose) ตามโครงสร้างสถาปัตยกรรมแบบ **MVC Pattern (Model-View-Controller)**

---

## 🏗️ Project Structure

```text
seller-api/
├── controllers/
│   ├── auth.controller.js      # จัดการ Login, Register, Approve User
│   └── product.controller.js   # จัดการ CRUD Product และ Order/Stock Validation
├── middlewares/
│   └── auth.js                 # Verify JWT Token & Check User Approval Status
├── models/
│   └── db.js                   # Mongoose Schemas (User, Product, Order)
├── routes/
│   ├── auth.routes.js          # Routes สำหรับ Auth & Global Orders
│   └── product.routes.js       # Routes สำหรับ Product & Product Orders
├── utils/
│   └── response.js             # Standard Response Helper { status, message, data }
├── .gitignore                  # ซ่อน node_modules และไฟล์คอนฟิก
├── app.js                      # Application Entry Point & Express Server
├── package.json
└── README.md
