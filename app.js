// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// นำเข้า Router ที่เราแยกไว้
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost/seller-api')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// ใช้งาน Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/products', productRoutes);

// สั่งเปิดเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log('Server เปิดให้บริการแล้วที่ http://localhost:3000');
});