"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Crypt {
    instance = bcrypt_1.default;
    constructor() { }
    async hash(value) {
        const salt = await this.instance.genSalt(10);
        const hash = await this.instance.hash(value, salt);
        return hash;
    }
    async validate(value, hash) {
        const isOk = await bcrypt_1.default.compare(value, hash);
        return isOk;
    }
}
exports.default = new Crypt();
