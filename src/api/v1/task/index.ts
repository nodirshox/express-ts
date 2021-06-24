import { Router } from 'express';
import { validate } from 'express-validation';
import validations from './validations';
import TaskController from './controllers';
import { container } from 'tsyringe';

const router = Router();
const controller = container.resolve(TaskController);

router.route('/')
  .get(controller.find)
  .post(validate(validations.create, { keyByField: true }), controller.create);

router.route('/:id')
  .get(controller.get)
  .put(validate(validations.create, { keyByField: true }), controller.update)
  .delete(controller.remove);

export default router;