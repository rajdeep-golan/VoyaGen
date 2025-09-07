"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripAdvise_1 = __importDefault(require("../controllers/tripAdvise"));
const saveTrip_1 = __importDefault(require("../controllers/saveTrip"));
const getTrips_1 = require("../controllers/getTrips");
const router = express_1.default.Router();
router.post('/tripAdvise', [], tripAdvise_1.default);
router.post('/saveTrip', [], saveTrip_1.default);
router.get('/trips', [], getTrips_1.getTrips);
exports.default = router;
