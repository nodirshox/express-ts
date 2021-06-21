import { Request, Response } from "express";
import Task from "../modules/Task";
import logger from "../config/logger";
import async from "async";

export const create = async (req: Request, res: Response) => {
    const request = req.body;
    logger.info("Task create request", request);
    const newTask = new Task(request);

    newTask.save((err, result) => {
        if (err) {
            logger.error(`Error on creating task: ${err.message}`);
            return res.status(500).json({
                error: err.message
            });
        }
        res.status(201).json({
            task: result
        })
    });
}

export const find = async (req: Request, res: Response) => {
    const query: any = {
        deleted_at: null
    }
    const DEFAULT_PAGE_LIMIT: number = 10;

    const page: string = req.query.page as string;
    const limit: string = req.query.limit as string;

    interface IOptions {
        skip: number,
        limit: number,
        sort: {
            created_at: string
        }
    }

    const options: IOptions = {
        skip: (page ? parseInt(page, 10) - 1 : 0) * (limit ? parseInt(limit, 10) : DEFAULT_PAGE_LIMIT),
        limit: limit ? parseInt(limit, 10) : DEFAULT_PAGE_LIMIT,
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
}

export const get = async (req: Request, res: Response) => {
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
}

export const update = async (req: Request, res: Response) => {
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
}

export const remove = async (req: Request, res: Response) => {
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
