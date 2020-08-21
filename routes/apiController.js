import { Router } from 'express';

import userController from './controllers/user.controller';
import boardController from './controllers/board.controller';

const router = Router();

router.use('/user', userController);
router.use('/board', boardController);

export default router;
