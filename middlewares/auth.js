// middlewares/auth.js

// 1. นำเข้า library jsonwebtoken (JWT) เพื่อใช้ในการตรวจสอบ token (ถอดรหัสบัตรผ่าน token)
const jwt = require('jsonwebtoken');

// 2. นำเข้าตาราง User จากไฟล์ db.js
const { User } = require('../models/db');

// 3. นำเข้าฟังก์ชันจัดรูปแบบข้อความจาก utils/response.js เพื่อใช้ในการส่งข้อความตอบกลับ
const sendResponse = require('../utils/response');

// 4. สร้าง funcction ชื่อ verifyToken เพื่อใช้ตรวจสอบ token ที่ส่งมาจาก client
const verifyToken = async (req, res, next) => {
    try {
        // 5. ดึง token จาก header ของ request (Authorization) ส่วนใหญ่จะแนบมาในรูปแบบ "Bearer <token>" ดังนั้นเราต้องแยกเอาเฉพาะ token ออกมา
        const token = req.headers.authorization?.replace('Bearer ', '');

        // 6. ถ้าไม่มี token ให้ส่งกลับข้อความ "Unauthorized (ไม่มีสิทธิ์): No token provided" พร้อมรหัสสถานะ 401
        if (!token) {
            return sendResponse(res, 401, 'Unauthorized: No token provided');
        }

        // 7. ใช้ jwt ถอดรหัส token ด้วยกุญแจลับ (secret key) ที่เก็บไว้ใน environment variable (process.env.JWT_SECRET) เพื่อดึงข้อมูลผู้ใช้ (userId) ออกมา
        const decoded = jwt.verify(token, 'secret_key'); // แนะนำให้เก็บ secret key ใน environment variable แทนการเขียนตรงๆ

        // 8. เอา ID ที่ซ่อนอยู่ใน token (decoded.userId) ไปค้นหาในฐานข้อมูลเพื่อดูว่าผู้ใช้นี้มีอยู่จริงหรือไม่
        const user = await User.findById(decoded.userId);

        // 9. ถ้าหา User ไม่เจอ หรือ เจอแต่สถานะ is_approved เป็น false  (ยังไม่อนุมัติ)ให้ส่งกลับข้อความ "Unauthorized (ไม่มีสิทธิ์): User not found" พร้อมรหัสสถานะ 401
        if (!user || !user.is_approved) {
            // เตะออก ส่งรหัส 401 เพราะยังไม่มีสิทธิ์ทำรายการตาม Flowchart
            return sendResponse(res, 401, 'Unauthorized: User not found');
        }

        // 10. ถ้าผู้ใช้มีอยู่และอนุมัติแล้ว ให้เก็บข้อมูลผู้ใช้ใน req.user เพื่อให้ฟังก์ชันอื่นๆ ดึงไปใช้ต่อได้ และเรียก next() เพื่อไปยัง middleware ถัดไป
        req.user = user;
        // 11. สั่งเปิดประตู ให้คำสั่งวิ่งไปทำงานใน API  ที่ลูกค้าเรียกมาได้เลย
        next();

    } catch (error) {
        // 12. ถ้า token ไม่ถูกต้องหรือหมดอายุ หรือพิมพื Token มั่วมา ระบบจะพังและตกลงมาตรงนี้ ให้ส่งกลับข้อความ "Unauthorized (ไม่มีสิทธิ์): Invalid token" พร้อมรหัสสถานะ 401
        return sendResponse(res, 401, 'Unauthorized: Invalid token');
    }
};

// 13. ส่งออก function 
module.exports = verifyToken;