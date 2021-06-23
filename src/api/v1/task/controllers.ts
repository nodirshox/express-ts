import { Request, Response } from "express";
import Task from "../../../models/Task";
import logger from "../../../config/logger";
import { ApiError, ApiResponse, tryAsync } from '../../../shared/index';

export const create = tryAsync(async (req: Request, res: Response) => {
    const request = req.body;
    logger.info("Task create request", request);

    if (!request.title || !request.author || request.is_active == null) {
        throw new ApiError(400, 'VALIDATION_ERROR');
    }
    const result = await Task.create(request);
    new ApiResponse(result, 201).send(res);
});

export const find = tryAsync(async (req: Request, res: Response) => {
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
    const [items, count] = await Promise.all([
        Task.find(query, {}, options),
        Task.countDocuments(query)
    ]);
    new ApiResponse({ items, count }).send(res);
});

export const get = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    logger.info("Task get request: ", taskId);

    const query: any = {
        _id: taskId,
        deleted_at: null
    }
    const result = await Task.findOne(query);

    if (!result) {
        throw new ApiError(404);
    }
    new ApiResponse(result).send(res);
});

export const update = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const newTask = req.body;
    logger.info("Task update request: " + taskId, newTask);
    if (!newTask.title || !newTask.author || newTask.is_active == null) {
        throw new ApiError(400, 'VALIDATION_ERROR');
    }

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
    if (!result) {
        throw new ApiError(404);
    }
    new ApiResponse(result).send(res);
});

export const remove = tryAsync(async (req: Request, res: Response) => {
    const taskId = req.params.id;
    logger.info("Delete task request: " + taskId);

    const query: any = {
        _id: taskId,
        deleted_at: null
    }

    const updateData = {
        deleted_at: new Date()
    }

    const result = await Task.findOneAndUpdate(query, updateData, { new: true });
    if (!result) {
        throw new ApiError(404);
    }
    new ApiResponse(result, 204).send(res);
});
