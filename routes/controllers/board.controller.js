import { Router } from 'express';

// jwt
import verifyToken from '../middlewares/jwt/verifyToken';

// common
import checkValidation from '../middlewares/common/checkValidation';

// postBoard
import postBoardValidation from '../middlewares/board/post/_validation';
import postBoard from '../middlewares/board/post/postBoard';

const router = Router();

router.use(verifyToken);

router.post('/', postBoardValidation);

router.use(checkValidation);

router.post('/', postBoard);

export default router;
