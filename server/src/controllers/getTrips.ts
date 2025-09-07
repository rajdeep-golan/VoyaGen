import { type RequestHandler } from 'express';
import mongoose from 'mongoose';

const Trip = mongoose.models.Trip || mongoose.model('Trip');

export const getTrips: RequestHandler = async (_req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};