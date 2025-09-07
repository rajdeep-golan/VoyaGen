"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("../../utils/joi"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const crypt_1 = __importDefault(require("../../utils/crypt"));
const Account_1 = __importDefault(require("../../models/Account"));
const login = async (req, res, next) => {
    try {
        const validationError = await joi_1.default.validate({
            username: joi_1.default.instance.string().required(),
            password: joi_1.default.instance.string().required(),
        }, req.body);
        if (validationError) {
            return next(validationError);
        }
        const { username, password } = req.body;
        // Get account from DB, and verify existance
        const account = await Account_1.default.findOne({ username });
        if (!account) {
            return next({
                statusCode: 400,
                message: 'Bad credentials',
            });
        }
        // Verify password hash
        const passOk = crypt_1.default.validate(password, account.password);
        if (!passOk) {
            return next({
                statusCode: 400,
                message: 'Bad credentials',
            });
        }
        // Generate access token
        const token = jwt_1.default.signToken({ uid: account._id, role: account.role });
        // Remove password from response data
        const { password: _, ...accountData } = account.toObject();
        res.status(200).json({
            message: 'Succesfully logged-in',
            data: accountData,
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = login;
