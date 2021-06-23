import * as dotenv from "dotenv";
import express from "express";
import MongoDB from './config/mongo';
import logger from "./config/logger";

import api from "./api/index";

dotenv.config();

// Create new Mongoose connection instance and connect to it
(new MongoDB()).connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routers
app.use('/api', api);

// default and unknown requests
app.get("/", (_, res) => res.json({ "message": "API is working..." }));
app.use((_, res) => res.status(404).json({ "message": "API not found" }));

const PORT: number = parseInt(process.env.SERVICE_HTTP_PORT as string, 10);
app.listen(PORT, () => {
    logger.info(`Server start on port: ${PORT}`);
});
