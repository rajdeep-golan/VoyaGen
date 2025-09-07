import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import serviceAccount from '../utils/service-account.json';

export function getServiceAccountCalendar() {
  const jwtClient = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth: jwtClient });
}