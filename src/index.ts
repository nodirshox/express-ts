import express from "express";
const app = express();

// MongoDB connection
import mongoose from "mongoose";
const url = "mongodb://localhost:27017/Task";

mongoose.connect(url,
    {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
    },
    (err) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.log("Error on connection to MongoDB", err.message);
        }
    }
);

mongoose.connection.once("open", () => {
    // tslint:disable-next-line:no-console
    console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
    res.send("Hello world in TS");
});

const port: number = 3000;

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port: ${port}`);
});