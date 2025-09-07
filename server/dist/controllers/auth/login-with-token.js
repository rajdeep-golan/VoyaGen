"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../../utils/jwt"));
const Account_1 = __importDefault(require("../../models/Account"));
const loginWithToken = async (req, res, next) => {
    try {
        const { uid } = req.auth || {};
        // Get account from DB, password is not verified because we're already token-authorized at this point
        const account = await Account_1.default.findOne({ _id: uid }).select('-password');
        if (!account) {
            return next({
                statusCode: 400,
                message: 'Bad credentials',
            });
        }
        // Generate access token
        const token = jwt_1.default.signToken({ uid: account._id, role: account.role });
        res.status(200).json({
            message: 'Succesfully got account',
            data: account,
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = loginWithToken;
