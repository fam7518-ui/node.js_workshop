
const jwt = require('jsonwebtoken');

const { User } = require('../models/db');

const sendResponse = require('../utils/response');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return sendResponse(res, 401, 'Unauthorized: No token provided');
        }

        const decoded = jwt.verify(token, 'secret_key'); 

        const user = await User.findById(decoded.userId);

        if (!user || !user.is_approved) {
            return sendResponse(res, 401, 'Unauthorized: User not found');
        }

        req.user = user;
        next();

    } catch (error) { 
        return sendResponse(res, 401, 'Unauthorized: Invalid token');
    }
};
 
module.exports = verifyToken;