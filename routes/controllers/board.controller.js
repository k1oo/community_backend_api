import { Router } from 'express';

// jwt
import verifyToken from '../middlewares/jwt/verifyToken';

// common
import checkValidation from '../middlewares/common/checkValidation';

// postBoard
import postBoardValidation from '../middlewares/board/post/_validation';
import postBoard from '../middlewares/board/post/postBoard';

// getBoard
import getBoardValidation from '../middlewares/board/get/_validation';
import getBoard from '../middlewares/board/get/getBoard';

const router = Router();

router.get('/', getBoardValidation, checkValidation, getBoard);

router.use(verifyToken);

router.post('/', postBoardValidation);

router.use(checkValidation);

router.post('/', postBoard);

export default router;
