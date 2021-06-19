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
            res.status(201).json({
                task_id: result.id,
            })
        });
    },
    find: (req: any, res: any) => {
        const query: any = {
            deleted_at: null
        }
        Task.find(query).exec((err, result) => {
            if (err) {
                logger.error(`Error on finding task: ${err.message}`);
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
    get: (req: any, res: any) => {
        const taskId = req.params.id;
        const query: any = {
            _id: taskId,
            deleted_at: null
        }
        Task.findOne(query).exec((err, result) => {
            if (err) {
                logger.error(`Error on getting task: ${err.message}`);
                return res.status(500).json({
                    error: err.message
                });
            }
            if (result == null) {
                return res.status(404).json({
                    error: "Not found"
                })
            }
            res.json({
                task: result
            });
        })
    },
    update: (req: any, res: any) => {
        const taskId = req.params.id;
        const newTask = req.body;
        const query: any = {
            _id: taskId,
            deleted_at: null
        }

        Task.findOne(query).exec((err, result) => {
            if (err) {
                logger.error(`Error on updating task: ${err.message}`);
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result == null) {
                return res.status(404).json({
                    error: "Not found"
                })
            }
            result.title = newTask.title;
            result.author = newTask.author;
            result.is_active = newTask.is_active;
            result.updated_at = new Date();

            result.save((error, response) => {
                if (error) {
                    logger.error(`Error on updating task: ${error.message}`);
                    return res.status(500).json({
                        error: error.message
                    })
                }
                return res.json({
                    task: response
                });
            })
        })
    },
    delete: (req: any, res: any) => {
        const taskId = req.params.id;
        const query: any = {
            _id: taskId,
            deleted_at: null
        }
        Task.findOne(query).exec((err, result) => {
            if (err) {
                logger.error(`Error on deleting: ${err.message}`);
                return res.status(500).json({
                    error: err.message
                })
            }
            if (result == null) {
                return res.status(404).json()
            }
            result.deleted_at = new Date();

            result.save((error, response) => {
                if (error) {
                    logger.error(`Error on deleting task: ${error.message}`);
                    return res.status(500).json({
                        error: error.message
                    })
                }

                return res.status(204).json();
            })
        })
    }
}

export default taskAPI;