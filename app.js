const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/seller-api')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/v1', authRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(3000, () => {
    console.log('Server เปิดให้บริการแล้วที่ http://localhost:3000');
});