import { Request, Response } from "express";
import Task from "../../../models/Task";
import logger from "../../../config/logger";
import async from "async";

export const create = async (req: Request, res: Response) => {
    const request = req.body;
    logger.info("Task create request", request);

    if (!request.title || !request.author || request.is_active == null) {
        return res.status(400).json({ message: "Required fields not given" });
    }

    try {
        const result = await Task.create(request);
        res.status(201).json({
            task: result
        })
    } catch (error) {
        logger.error(`Error on creating task: ${error.message}`);
        res.status(500).json({
            error: error.message
        });
    }
}

export const find = async (req: Request, res: Response) => {
    console.log(req.originalUrl);
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
    logger.info("Task get request: ", taskId);

    try {
        const query: any = {
            _id: taskId,
            deleted_at: null
        }
        const result = await Task.findOne(query);

        if (result == null) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json({ task: result });
    } catch (error) {
        logger.error(`Error on getting task: ${error.message}`);
        res.status(500).json({
            error: error.message
        });
    }
}

export const update = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const newTask = req.body;
    logger.info("Task update request: " + taskId, newTask);
    if (!newTask.title || !newTask.author || newTask.is_active == null) {
        return res.status(400).json({ message: "Required fields not given" });
    }
    try {
        const query: any = {
            _id: taskId,
            deleted_at: null
        }
        const updateData = {
            title: newTask.title,
            author: newTask.author,
            is_active: newTask.is_active,
            updated_at: new Date()
        }
        const result = await Task.findOneAndUpdate(query, updateData)
        if (result == null) {
            return res.status(404).json({
                error: "Not found"
            })
        }
        res.json({ task: result });
    } catch (error) {
        logger.error(`Error on updating task: ${error.message}`);
        return res.status(500).json({
            error: error.message
        })
    }
}

export const remove = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    logger.info("Delete task request: " + taskId);
    try {
        const query: any = {
            _id: taskId,
            deleted_at: null
        }

        const updateData = {
            deleted_at: new Date()
        }

        const result = await Task.findOneAndUpdate(query, updateData);
        if (result == null) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(204).json();
    } catch (error) {
        logger.error(`Error on deleting task: ${error.message}`);
        return res.status(500).json({
            error: error.message
        })
    }
}
