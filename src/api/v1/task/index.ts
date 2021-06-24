import { Router } from 'express';
import { validate } from 'express-validation';
import validations from './validations';
import TaskController from './controllers';
import { container } from 'tsyringe';

const router = Router();
const controllers = container.resolve(TaskController);

router.route('/')
  .get(controllers.find)
  .post(validate(validations.create, { keyByField: true }), controllers.create);

router.route('/:id')
  .get(controllers.get)
  .put(validate(validations.create, { keyByField: true }), controllers.update)
  .delete(controllers.remove);

export default router;