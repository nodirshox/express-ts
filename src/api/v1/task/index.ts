import { Router } from 'express';
import * as controllers from './controllers'

const router = Router();

router.route('/')
  .get(controllers.find)
  .post(controllers.create);

router.route('/:id')
  .get(controllers.get)
  .put(controllers.update)
  .delete(controllers.remove);

export default router;