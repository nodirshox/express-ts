import express from "express"
import * as TaskAPI from "./task";

const router = express.Router();

// default
router.get("/", (req, res) => res.json({ "message": "API is working..." }));

// task
router.post("/task/", TaskAPI.create);
router.get("/task/", TaskAPI.find);
router.get("/task/:id", TaskAPI.get);
router.put("/task/:id", TaskAPI.update);
router.delete("/task/:id", TaskAPI.remove);

export default router;