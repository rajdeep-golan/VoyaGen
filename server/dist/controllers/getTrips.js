"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrips = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Trip = mongoose_1.default.models.Trip || mongoose_1.default.model('Trip');
const getTrips = async (_req, res) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 });
        res.json({ trips });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch trips' });
    }
};
exports.getTrips = getTrips;
