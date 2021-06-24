import Task from '../../../models/Task';
import { Request } from 'express';

export default class TaskService {
  createTask(task: object) {
    return Task.create(task);
  }

  find(query: object, req: Request) {
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
    return Promise.all([
      Task.find(query, {}, options),
      Task.countDocuments(query)
    ]);
  }

  findOne(query: object) {
    return Task.findOne(query);
  }

  update(query: object, update: object, options: object = {}) {
    return Task.findOneAndUpdate(query, update, options)
  }

  delete(id: string) {
    const query: any = {
      _id: id,
      deleted_at: null
    }

    const updateData = {
      deleted_at: new Date()
    }

    return Task.findOneAndUpdate(query, updateData);
  }
}