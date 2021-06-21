import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import logger from "./config/logger";
import config from "./config/index";
import Router from "./api/index";

dotenv.config();

const app = express();

// MongoDB connection
const url = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`;

mongoose.connect(url,
    {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
    },
    (err) => {
        if (err) {
            logger.error(`Error on connection to MongoDB: ${err.message}`);
        }
    }
);

mongoose.connection.once("open", () => {
    logger.info("MongoDB is connected");
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1', Router);

// 404
app.use((req, res) => {
    return res.status(404).json({"message": "API not found"});
});

const PORT: number = parseInt(process.env.SERVICE_HTTP_PORT as string, 10);

app.listen(PORT, () => {
    logger.info(`Server start on port: ${PORT}`);
});