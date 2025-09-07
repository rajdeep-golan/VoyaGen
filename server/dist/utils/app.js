"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../constants/index");
const express_session_1 = __importDefault(require("express-session"));
// initialize app
const app = (0, express_1.default)();
// middlewares
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true if using HTTPS
}));
app.use((0, cors_1.default)({ origin: index_1.ORIGIN }));
app.use(express_1.default.json()); // body parser
app.use(express_1.default.urlencoded({ extended: false })); // url parser
exports.default = app;
