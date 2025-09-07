import { type RequestHandler } from 'express';
import mongoose from 'mongoose';

// Define a simple Trip schema if you don't have one
const tripSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  itinerary: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

const saveTrip: any = async (req:any, res:any) => {
  try {
    const { user, itinerary } = req.body;
    if (!user || !itinerary) {
      return res.status(400).json({ error: 'User and itinerary are required.' });
    }

    const trip = new Trip({ user, itinerary });
    await trip.save();

    res.status(201).json({ message: 'Trip saved successfully', tripId: trip._id });
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ error: 'Failed to save trip' });
  }
};

export default saveTrip;