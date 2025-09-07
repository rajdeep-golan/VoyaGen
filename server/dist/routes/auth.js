"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_bearer_token_1 = __importDefault(require("../middlewares/check-bearer-token"));
const error_handler_1 = __importDefault(require("../middlewares/error-handler"));
const register_1 = __importDefault(require("../controllers/auth/register"));
const login_1 = __importDefault(require("../controllers/auth/login"));
const login_with_token_1 = __importDefault(require("../controllers/auth/login-with-token"));
// initialize router
const router = express_1.default.Router();
// POST at route: http://localhost:8080/auth/register
router.post('/register', [], register_1.default, error_handler_1.default);
// POST at path: http://localhost:8080/auth/login
router.post('/login', [], login_1.default, error_handler_1.default);
// GET at path: http://localhost:8080/auth/account
router.get('/login', [check_bearer_token_1.default], login_with_token_1.default, error_handler_1.default);
exports.default = router;
