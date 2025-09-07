"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define a simple Trip schema if you don't have one
const tripSchema = new mongoose_1.default.Schema({
    user: { type: Object, required: true },
    itinerary: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Trip = mongoose_1.default.models.Trip || mongoose_1.default.model('Trip', tripSchema);
const saveTrip = async (req, res) => {
    try {
        const { user, itinerary } = req.body;
        if (!user || !itinerary) {
            return res.status(400).json({ error: 'User and itinerary are required.' });
        }
        const trip = new Trip({ user, itinerary });
        await trip.save();
        res.status(201).json({ message: 'Trip saved successfully', tripId: trip._id });
    }
    catch (error) {
        console.error('Error saving trip:', error);
        res.status(500).json({ error: 'Failed to save trip' });
    }
};
exports.default = saveTrip;
