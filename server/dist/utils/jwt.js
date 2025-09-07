"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../constants/index");
class JWT {
    instance = jsonwebtoken_1.default;
    secret;
    constructor() {
        this.secret = index_1.JWT_SECRET;
    }
    signToken(payload, expiresIn = '12h') {
        const token = this.instance.sign(payload, index_1.JWT_SECRET, { expiresIn });
        return token;
    }
    verifyToken(token) {
        const auth = this.instance.verify(token, index_1.JWT_SECRET);
        return auth;
    }
}
exports.default = new JWT();
