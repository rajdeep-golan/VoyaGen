"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceAccountCalendar = getServiceAccountCalendar;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const service_account_json_1 = __importDefault(require("../utils/service-account.json"));
function getServiceAccountCalendar() {
    const jwtClient = new google_auth_library_1.JWT({
        email: service_account_json_1.default.client_email,
        key: service_account_json_1.default.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    return googleapis_1.google.calendar({ version: 'v3', auth: jwtClient });
}
