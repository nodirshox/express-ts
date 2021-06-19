import Task from "../modules/Task";
import logger from "../config/logger";

const taskAPI = {
    create: (req: any, res: any) => {
        const newTask = new Task(req.body);

        newTask.save((err, result) => {
            if (err) {
                logger.error(`Error on creating task: ${err.message}`);
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json({
                task_id: result.id,
            })
        });
    },
    get: (req: any, res: any) => {
        Task.find({}).exec((err, result) => {
            if (err) {
                logger.error(`Error on getting task: ${err.message}`);
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json({
                tasks: result,
                count: result.length
            });
        });
    },
}

export default taskAPI;