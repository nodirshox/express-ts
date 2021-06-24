import { autoInjectable } from 'tsyringe';
import { Request, Response } from "express";
import logger from "../../../config/logger";
import { ApiError, ApiResponse, tryAsync } from '../../../shared/index';
import TaskService from "../../../services/TaskService";
@autoInjectable()
export default class TaskController {
    constructor(private readonly taskService: TaskService) { }

    create = tryAsync(async (req: Request, res: Response) => {
        const request = req.body;
        logger.info("Task create request", request);

        const result = await this.taskService.createTask(request);
        new ApiResponse(result, 201).send(res);
    });

    find = tryAsync(async (req: Request, res: Response) => {
        const query: object = {
            deleted_at: null
        }
        const [items, count] = await this.taskService.find(query, req);
        new ApiResponse({ items, count }).send(res);
    });

    get = tryAsync(async (req: Request, res: Response) => {
        const taskId = req.params.id;
        logger.info("Task get request: ", taskId);

        const query: any = {
            _id: taskId,
            deleted_at: null
        }
        const result = await this.taskService.findOne(query);

        if (!result) {
            throw new ApiError(404);
        }
        new ApiResponse(result).send(res);
    });

    update = tryAsync(async (req: Request, res: Response) => {
        const taskId = req.params.id;
        const newTask = req.body;
        logger.info("Task update request: " + taskId, newTask);

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
        const result = await this.taskService.update(query, updateData, { new: true });
        if (!result) {
            throw new ApiError(404);
        }
        new ApiResponse(result).send(res);
    });

    remove = tryAsync(async (req: Request, res: Response) => {
        const taskId = req.params.id;
        logger.info("Delete task request: " + taskId);

        const result = await this.taskService.delete(taskId);

        if (!result) {
            throw new ApiError(404);
        }
        new ApiResponse({}, 204).send(res);
    });
}