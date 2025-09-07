"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../utils/jwt"));
const checkBearerToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next({
                statusCode: 400,
                message: 'Token not provided',
            });
        }
        const auth = jwt_1.default.verifyToken(token);
        if (!auth) {
            return next({
                statusCode: 401,
                message: 'Invalid token',
            });
        }
        req.auth = typeof auth === 'string' ? JSON.parse(auth) : auth;
        next();
    }
    catch (error) {
        next({
            statusCode: 401,
            message: 'Invalid token',
        });
    }
};
exports.default = checkBearerToken;
