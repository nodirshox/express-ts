import { Router } from "express"
import TaskAPI from "./task/index";
import swaggerUi from "swagger-ui-express";
import { docs } from "../../docs/index";

const router = Router();

// swagger
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(docs));

router.use('/task', TaskAPI);

export default router;
