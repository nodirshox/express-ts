import * as dotenv from "dotenv";
import express from "express";
import MongoDB from './config/mongo';
import logger from "./config/logger";

import RouterV1 from "./api/v1/index";

dotenv.config();

// Create new Mongoose connection instance and connect to it
(new MongoDB()).connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// v1 routers
app.use('/api/v1', RouterV1);

// default and unknown requests
app.get("/", (req, res) => res.json({ "message": "API is working..." }));
app.use((req, res) => res.status(404).json({ "message": "API not found" }));

const PORT: number = parseInt(process.env.SERVICE_HTTP_PORT as string, 10);
app.listen(PORT, () => {
    logger.info(`Server start on port: ${PORT}`);
});
