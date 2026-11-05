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
🛠️ Tech Stack & DependenciesRuntime Environment: Node.jsFramework: Express.js (v5)Database: MongoDB & Mongoose ODM (v9)Authentication: JSON Web Token (jsonwebtoken) & bcryptjsMiddleware: CORS (cors)📊 Database Schema Design1. User Schema (User)username (String, Required, Unique)password (String, Required - Encrypted with bcrypt)is_approved (Boolean, Default: false)2. Product Schema (Product)name (String, Required)price (Number, Required)stock (Number, Required, Default: 0)3. Order Schema (Order)product_id (ObjectId, Ref: 'Product')qty (Number, Required)📡 Standardized Response Formatทุก Endpoint ตอบกลับในรูปแบบ JSON มาตรฐานเดียวกันดังนี้:JSON{
  "status": 200,
  "message": "success",
  "data": { ... }
}
HTTP Status 200 / 201: ดำเนินการสำเร็จHTTP Status 400: Bad Request (ข้อมูลไม่ถูกต้อง / สต็อกไม่พอ / ไม่พบข้อมูล) -> data: nullHTTP Status 401: Unauthorized (ไม่มี Token / Token ไม่ถูกต้อง / ผู้ใช้ยังไม่ได้รับการอนุมัติ is_approved: false)HTTP Status 500: Internal Server Error🔌 API Endpoints Specification🔑 Auth & User Management (/api/v1)MethodEndpointAccessDescriptionStatus CodePOST/registerPublicสมัครสมาชิกใหม่ (is_approved = false)201 CreatedPOST/loginPublicเข้าสู่ระบบ (คืนค่า JWT Token เมื่ออนุมัติแล้ว)200 Success / 401PUT/users/:id/approvePublicอนุมัติสิทธิ์ผู้ใช้งาน (is_approved = true)200 Success📦 Product Management (/api/v1/products)MethodEndpointAccessDescriptionStatus CodeGET/Publicดึงรายการสินค้าทั้งหมด (ไม่มีของส่ง [])200 SuccessGET/:idPublicดึงข้อมูลสินค้าตาม ID (ไม่มีส่ง null)200 Success / 400POST/Protectedเพิ่มสินค้าใหม่ในระบบ201 CreatedPUT/:idProtectedแก้ไขข้อมูลสินค้า200 SuccessDELETE/:idProtectedลบรายการสินค้า200 Success🛒 Order & Stock Control (/api/v1)MethodEndpointAccessDescriptionStatus CodePOST/products/:id/ordersProtectedสั่งซื้อสินค้า + ตัดสต็อก (stock -= order_qty)201 Created / 400GET/products/:id/ordersProtectedแสดง Order ทั้งหมดของสินค้าเฉพาะตัว200 SuccessGET/ordersProtectedแสดง Order ทุกรายการในระบบ (Populate Product)200 Success⚠️ Stock Control Logic: ในขั้นตอนการสั่งซื้อ POST /products/:id/orders ระบบจะตรวจสอบหาก product.stock < order_qty จะปฏิเสธรายการทันทีด้วยรหัส 400 Bad Request เพื่อป้องกันสินค้าขาดสต็อก (Overselling)⚡ How to Run Project1. Clone RepositoryBashgit clone [https://github.com/fam7518-ui/node.js_workshop.git](https://github.com/fam7518-ui/node.js_workshop.git)
cd node.js_workshop
2. Install DependenciesBashnpm install
3. Start ServerBashnode app.js
เซิร์ฟเวอร์จะเปิดให้บริการที่: http://localhost:3000
