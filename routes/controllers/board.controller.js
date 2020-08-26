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

// patchBoard
import patchBoardValidation from '../middlewares/board/patch/_validation';
import patchBoard from '../middlewares/board/patch/patchBoard';

// deleteBoard
import deleteBoardValidation from '../middlewares/board/delete/_validation';
import deleteBoard from '../middlewares/board/delete/deleteBoard';

// post boardLike
import postBoardLikeValidation from '../middlewares/board/like/_validation';
import postBoardLike from '../middlewares/board/like/postBoardLike';

const router = Router();

router.get('/', getBoardValidation, checkValidation, getBoard);

router.use(verifyToken);

router.post('/', postBoardValidation);
router.patch('/', patchBoardValidation);
router.delete('/', deleteBoardValidation);
router.post('/like', postBoardLikeValidation);

router.use(checkValidation);

router.post('/', postBoard);
router.patch('/', patchBoard);
router.delete('/', deleteBoard);
router.post('/like', postBoardLike);

export default router;
