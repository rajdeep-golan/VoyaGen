// src/types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    tokens?: any; // You can replace `any` with the actual token structure
  }
}
