import express from "express"
import TaskAPI from "./task";

const router = express.Router();

router.post('/', TaskAPI.create);
router.get('/', TaskAPI.get);

export default router;