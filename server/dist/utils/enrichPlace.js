"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGoogleMapsLink = fetchGoogleMapsLink;
exports.fetchYouTubeVideoLink = fetchYouTubeVideoLink;
exports.fetchImageLink = fetchImageLink;
const axios_1 = __importDefault(require("axios"));
async function fetchGoogleMapsLink(placeName) {
    const encodedPlace = encodeURIComponent(placeName);
    return `https://www.google.com/maps/search/?api=1&query=${encodedPlace}`;
}
async function fetchYouTubeVideoLink(placeName) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const response = await axios_1.default.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            q: placeName,
            part: 'snippet',
            type: 'video',
            key: apiKey,
            maxResults: 1,
            regionCode: 'US', // Optional: Limit to US or customize
            videoEmbeddable: 'true', // Ensures the video can be embedded
        },
    });
    const videoId = response.data.items?.[0]?.id?.videoId;
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
}
async function fetchImageLink(placeName) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    // Step 1: Search for the place
    const searchResponse = await axios_1.default.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
            query: placeName,
            key: apiKey,
        },
    });
    const place = searchResponse.data.results?.[0];
    const photoReference = place?.photos?.[0]?.photo_reference;
    if (!photoReference) {
        return ''; // No photo available
    }
    // Step 2: Generate the photo URL manually
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${apiKey}`;
    return photoUrl;
}
