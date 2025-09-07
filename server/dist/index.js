"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./utils/app")); // (server)
const mongo_1 = __importDefault(require("./utils/mongo")); // (database)
const index_1 = require("./constants/index");
const api_1 = __importDefault(require("./routes/api"));
const bootstrap = async () => {
    await mongo_1.default.connect();
    app_1.default.get('/', (req, res) => {
        res.status(200).send('Hello, world!');
    });
    app_1.default.get('/healthz', (req, res) => {
        res.status(204).end();
    });
    app_1.default.use('/api', api_1.default);
    app_1.default.listen(index_1.PORT, () => {
        console.log(`✅ Server is listening on port: ${index_1.PORT}`);
    });
};
bootstrap();
