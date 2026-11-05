const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/db');
const sendResponse = require('../utils/response');

// สมัครสมาชิก
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return sendResponse(res, 400, 'Bad Request');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        return sendResponse(res, 201, 'Created', { username: newUser.username });
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// เข้าสู่ระบบ
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return sendResponse(res, 401, 'Unauthorized');
        }
        if (!user.is_approved) {
            return sendResponse(res, 401, 'Unauthorized');
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        return sendResponse(res, 200, 'success', { token });
    } catch (error) {
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// อนุมัติผู้ใช้
exports.approveUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
        if (!user) return sendResponse(res, 400, "Bad Request");
        return sendResponse(res, 200, "success", user);
    } catch (error) {
        return sendResponse(res, 500, "Internal Server Error");
    }
};