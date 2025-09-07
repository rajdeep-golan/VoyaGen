"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../constants/index");
const mongoose_1 = __importDefault(require("mongoose"));
class Mongo {
    instance = mongoose_1.default;
    mongoUri;
    mongoOptions;
    isConnected;
    constructor() {
        this.mongoUri = index_1.MONGO_URI;
        this.mongoOptions = index_1.MONGO_OPTIONS;
        this.isConnected = false;
    }
    async connect() {
        if (this.isConnected)
            return;
        try {
            console.log('⏳ Connecting to MongoDB');
            const db = await this.instance.connect(this.mongoUri, this.mongoOptions);
            const connection = db.connection;
            this.isConnected = connection.readyState === 1;
            if (this.isConnected)
                console.log('✅ MongoDB connected:', this.mongoUri);
            connection.on('connected', () => console.log('✅ MongoDB connected')); // re-connected
            connection.on('disconnected', () => console.log('❌ MongoDB disconnected')); // disconnected
            connection.on('error', (error) => console.log('❌ MongoDB connection error', error)); // listen for errors during the session
        }
        catch (error) {
            console.log('❌ MongoDB connection error:', error.message);
        }
    }
}
exports.default = new Mongo();
