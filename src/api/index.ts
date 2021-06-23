import { Router } from 'express';
import v1 from './v1/index';

const router = Router();

router.use('/v1', v1);
/*
So that, in the future you can have:

router.use('/v2', v2);
router.use('/v3', v3);
...
etc
...
*/
export default router;
