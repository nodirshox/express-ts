import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import logger from "./config/logger";
import config from "./config/index";
import TaskRouter from "./api/index";

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/task', TaskRouter);

const port: number = 3000;

app.listen(port, () => {
    logger.info(`Server start on port: ${port}`);
});