const sendResponse = (res, statusCode, message, data = null) => {
  let responseData = data;

    if (statusCode === 200 && Array.isArray(data) && data.length === 0) {
        responseData = [];
    }
    else if (statusCode === 400 && (!data || data.length === 0)) {
        responseData = null;
    }

    return res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: responseData
    }); 
}
    module.exports = sendResponse;