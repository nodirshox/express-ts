import express from "express"
import TaskAPI from "./task";

const router = express.Router();

router.post("/", TaskAPI.create);
router.get("/", TaskAPI.find);
router.get("/:id", TaskAPI.get);
router.put("/:id", TaskAPI.update);
router.delete("/:id", TaskAPI.delete);

export default router;