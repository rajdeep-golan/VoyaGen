"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Joi {
    instance = joi_1.default;
    constructor() { }
    async validate(schema, body) {
        try {
            await this.instance.object(schema).validateAsync(body);
        }
        catch (error) {
            console.log('❌ Joi validation error:', error.message);
            return {
                statusCode: 400,
                message: error.message,
            };
        }
    }
}
exports.default = new Joi();
