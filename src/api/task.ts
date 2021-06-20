import Task from "../modules/Task";
import logger from "../config/logger";
import async from "async";

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
        const DEFAULT_PAGE_LIMIT: number = 10;
        const options: any = {
            skip: (req.query.page ? req.query.page - 1 : 0) * (req.query.limit ? req.query.limit : DEFAULT_PAGE_LIMIT),
            limit: req.query.limit ? parseInt(req.query.limit, 10) : DEFAULT_PAGE_LIMIT,
            sort: {
                created_at: "desc"
            }
        }
        async.parallel(
            [
                (cb: any) => {
                    Task.find(query, null, options).exec((err, tasks) => {
                        if (err) {
                            logger.error(`Error on finding task: ${err.message}`);
                            return res.status(500).json({
                                error: err.message
                            });
                        }
                        return cb(null, tasks || [])
                    });
                },
                (cb: any) => {
                    Task.countDocuments(query).exec((err, count) => {
                        if (err) {
                            logger.error(`Error on finding task: ${err.message}`);
                            return res.status(500).json({
                                error: err.message
                            });
                        }

                        return cb(null, count || 0);
                    });
                }
            ],
            (err: any, results: any) => {
                return res.json({
                    task: results[0],
                    count: results[1]
                })
            }
        )
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