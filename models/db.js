const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    
    password: { type: String, required: true },

    is_approved: { type: Boolean, default: false }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },

    stock: { type: Number, required: true, default: 0 },

    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},

    qty: { type: Number, required: true },
});

module.exports = {
    User: mongoose.model('User', userSchema), 
    Product: mongoose.model('Product', productSchema), 
    Order: mongoose.model('Order', orderSchema)       
};