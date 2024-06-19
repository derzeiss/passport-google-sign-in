// app config
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '3001';
export const CLIENT_URL = process.env.CLIENT_URL || `https://${HOST}:${PORT}`;

// prisma
export const DATABASE_URL = process.env.DATABASE_URL || '';

// auth
export const SESSION_SECRET = process.env.SESSION_SECRET || 'dev sessions';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
