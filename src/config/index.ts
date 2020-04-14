import { config } from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("🔥Couldn't find .env file 🔥");
}

export default {
  port: parseInt(`${process.env.PORT}`, 10) || 3000,
  databaseURL: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
};
