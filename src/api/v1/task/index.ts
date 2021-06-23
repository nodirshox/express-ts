import { Router } from 'express';
import * as controllers from './controllers'
import { validate } from 'express-validation';
import validations from './validations';

const router = Router();

router.route('/')
  .get(controllers.find)
  .post(validate(validations.create, { keyByField: true }), controllers.create);

router.route('/:id')
  .get(controllers.get)
  .put(validate(validations.create, { keyByField: true }), controllers.update)
  .delete(controllers.remove);

export default router;