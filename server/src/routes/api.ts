import express from 'express';
import tripAdvise from '../controllers/tripAdvise';
import saveTrip from '../controllers/saveTrip';
import { getTrips } from '../controllers/getTrips';

const router = express.Router();

router.post('/tripAdvise', [], tripAdvise);
router.post('/saveTrip', [],saveTrip);
router.get('/trips', [], getTrips);

export default router;