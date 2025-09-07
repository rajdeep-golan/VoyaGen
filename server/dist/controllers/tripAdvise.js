"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const googleAuth_1 = require("../utils/googleAuth");
const enrichPlace_1 = require("../utils/enrichPlace");
const createCalendarEvents = async (itinerary) => {
    const calendar = (0, googleAuth_1.getServiceAccountCalendar)();
    const calendarId = '37f9a1c74fadd388a403a74241e4c56b2c344cb72e0509d797d6a32a765475ff@group.calendar.google.com';
    for (const event of itinerary) {
        const { place, date_time, location } = event;
        // Convert "YYYY-MM-DD HH:MM" to RFC3339
        // Assume date_time is in local time, convert to ISO string
        const startDate = new Date(date_time.replace(' ', 'T'));
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        await calendar.events.insert({
            calendarId,
            requestBody: {
                summary: place,
                location,
                description: `Part of your AI-generated trip itinerary`,
                start: { dateTime: startDate.toISOString(), timeZone: 'America/Los_Angeles' },
                end: { dateTime: endDate.toISOString(), timeZone: 'America/Los_Angeles' },
            },
        });
    }
};
const tripAdvise = async (req, res) => {
    const { name, destination, startDate, endDate, preferences, googleCalendarSync } = req.body;
    const prompt = `
  Create a day-by-day itinerary for ${name}, visiting ${destination} from ${startDate} to ${endDate}.
  They enjoy ${preferences.join(', ')}.
  
  For each activity, provide:
  - "place": Name of the place or activity
  - "date_time": Scheduled date and time in "YYYY-MM-DD HH:MM" format
  
  Output only a raw JSON array. No markdown, no explanations.
  `;
    try {
        const response = await axios_1.default.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }, { headers: { 'Content-Type': 'application/json' } });
        const candidates = response.data.candidates;
        let content = candidates?.[0]?.content?.parts?.[0]?.text || '[]';
        content = content.trim().replace(/^```json\n?/, '').replace(/```$/, '');
        const basicItinerary = JSON.parse(content);
        // Enrich each place
        const enrichedItinerary = await Promise.all(basicItinerary.map(async (item) => {
            const location = await (0, enrichPlace_1.fetchGoogleMapsLink)(item.place);
            const youtube = await (0, enrichPlace_1.fetchYouTubeVideoLink)(item.place);
            const image = await (0, enrichPlace_1.fetchImageLink)(item.place);
            return {
                ...item,
                location,
                youtube,
                image,
            };
        }));
        if (googleCalendarSync) {
            try {
                await createCalendarEvents(enrichedItinerary);
            }
            catch (calendarError) {
                console.error('Calendar sync failed:', calendarError);
                // Optionally, you can add a flag to the response to indicate calendar sync failed
            }
        }
        res.json({ itinerary: enrichedItinerary });
    }
    catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
};
exports.default = tripAdvise;
