"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const { statusCode = 500, message = 'Internal server error', ...rest } = error;
    res.status(statusCode).json({
        message,
        ...rest,
    });
};
exports.default = errorHandler;
