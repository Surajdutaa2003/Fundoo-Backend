import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

// Validate environment variables
if (!process.env.APP_HOST || !process.env.APP_PORT || !process.env.API_VERSION) {
  console.error("❌ Missing required environment variables: APP_HOST, APP_PORT, or API_VERSION");
  process.exit(1);
}

const app = express();
const host = process.env.APP_HOST.startsWith("http") ? process.env.APP_HOST : `http://${process.env.APP_HOST}`;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

// Initialize database
database();

// Middlewares
app.use(morgan('combined', { stream: logStream }));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import noteRoutes from "./routes/note.route.js";
app.use(`/api/${api_version}/notes`, noteRoutes);
app.use(`/api/${api_version}`, routes());

// Error Handling Middleware
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

// Start Server
app.listen(port, () => {
  logger.info(`🚀 Server running at ${host}:${port}/api/${api_version}/`);
});

export default app;
