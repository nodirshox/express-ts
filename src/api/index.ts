import express from "express"
import * as TaskAPI from "./task";

const router = express.Router();

router.post("/task/", TaskAPI.create);
router.get("/task/", TaskAPI.find);
router.get("/task/:id", TaskAPI.get);
router.put("/task/:id", TaskAPI.update);
router.delete("/task/:id", TaskAPI.remove);

router.get("/", (req, res) => res.json({ "message": "API is working..." }));

router.get("*", (req, res) => res.status(404).json({"message": "API not found"}));

export default router;