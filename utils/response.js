// utils/response.js

// 1. สร้าง function ชื่อ sendResponse รับค่า 4 อย่าง: res (ตัวส่งกลับ), statusCode (รหัสสถานะ),  message (ข้อความ), data (ข้อมูล)
const sendResponse = (res, statusCode, message, data = null) => {
  // 2. สร้างตัวแปร responseData มารับค่า data เพื่อเตรียมเชคเงื่อนไข
  let responseData = data;

  // 3. เชคเงื่อนไขตาม Flowchart: เงื่อนไขที่ 1: ถ้า Status เป็น 200 (สำเร็จ) และข้อมูลเป็น Array แต่ไม่มีของข้างใน
    if (statusCode === 200 && Array.isArray(data) && data.length === 0) {
        // ให้แปลงข้อมูลเป็น Array ว่างๆ [] ส่งกลับไป
        responseData = [];
    }
  // 4. เช็คเงื่อนไขตาม Flowchart: เงื่อนไขที่ 2: ถ้า Status เป็น 400 (ทำงานไม่สำเร็จ) และข้อมูลเป็น Object แต่ไม่มีของข้างใน
    else if (statusCode === 400 && (!data || data.length === 0)) {
        // ให้แปลงข้อมูลเป็น nullส่งกลับไป
        responseData = null;
    }

    // 5. ส่งให้ express (res) ส่งข้อมูลกลับไปหาหน้าบ้านในรูปแบบ JSON โดยมีโครงสร้างดังนี้: { status: statusCode, message: message, data: responseData }
    return res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: responseData
    }); 
}

    
    // 6. ส่งออก function sendResponse เพื่อให้ไฟล์อื่นสามารถนำไปใช้งานได้
    module.exports = sendResponse;