import express from "express"
import * as TaskAPI from "./task";
import swaggerUi from "swagger-ui-express";
import { docs } from "../../docs/index";

const router = express.Router();

// swagger
router.use('/swagger',swaggerUi.serve,swaggerUi.setup(docs));

// task
router.post("/task/", TaskAPI.create);
router.get("/task/", TaskAPI.find);
router.get("/task/:id", TaskAPI.get);
router.put("/task/:id", TaskAPI.update);
router.delete("/task/:id", TaskAPI.remove);

export default router;