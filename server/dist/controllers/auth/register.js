"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("../../utils/joi"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const crypt_1 = __importDefault(require("../../utils/crypt"));
const Account_1 = __importDefault(require("../../models/Account"));
const register = async (req, res, next) => {
    try {
        const validationError = await joi_1.default.validate({
            username: joi_1.default.instance.string().required(),
            password: joi_1.default.instance.string().required(),
        }, req.body);
        if (validationError) {
            return next(validationError);
        }
        const { username, password } = req.body;
        // Verify account username as unique
        const found = await Account_1.default.findOne({ username });
        if (found) {
            return next({
                statusCode: 400,
                message: 'An account already exists with that "username"',
            });
        }
        // Encrypt password
        const hash = await crypt_1.default.hash(password);
        // Create account
        const account = new Account_1.default({ username, password: hash });
        await account.save();
        // Generate access token
        const token = jwt_1.default.signToken({ uid: account._id, role: account.role });
        // Exclude password from response
        const { password: _, ...data } = account.toObject();
        res.status(201).json({
            message: 'Succesfully registered',
            data,
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = register;
