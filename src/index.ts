import 'reflect-metadata';
import * as dotenv from "dotenv";
import express from "express";
import MongoDB from './config/mongo';
import api from "./api/index";
import logger from "./config/logger";
import { errorHandler } from './shared/index';
import 'module-alias/register';

dotenv.config();

// Create new Mongoose connection instance and connect to it
(new MongoDB()).connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routers
app.use('/api', api);

// Default and unknown requests
app.get("/", (_, res) => res.json({ "message": "API_IS_WORKING" }));
app.use((_, res) => res.status(404).json({ "message": "API_NOT_FOUND" }));

// Globally handle errors
app.use(errorHandler);

const PORT: number = parseInt(process.env.SERVICE_HTTP_PORT as string, 10);

app.listen(PORT, () => {
    logger.info(`Server started on port: ${PORT}`);
});
