"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_OPTIONS = exports.MONGO_URI = exports.PORT = exports.ORIGIN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('ENV FILE LOADED:', process.env);
const ORIGIN = '*';
exports.ORIGIN = ORIGIN;
const PORT = process.env.PORT || 8080;
exports.PORT = PORT;
// For "MongoDB Atlas": edit MONGO_URI in -> .env file
// For "MongoDB Community Server": edit <DB_NAME> in -> MONGO_URI below
console.log('MONGO_URI:', process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/<DB_NAME>';
exports.MONGO_URI = MONGO_URI;
const MONGO_OPTIONS = {};
exports.MONGO_OPTIONS = MONGO_OPTIONS;
const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret';
exports.JWT_SECRET = JWT_SECRET;
