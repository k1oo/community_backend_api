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

// postComment
import postCommentValidation from '../middlewares/board/comment/post/_validation';
import postComment from '../middlewares/board/comment/post/postComment';

// patchComment
import patchCommentValidation from '../middlewares/board/comment/patch/_validation';
import patchComment from '../middlewares/board/comment/patch/patchComment';

const router = Router();

router.get('/', getBoardValidation, checkValidation, getBoard);

router.use(verifyToken);

router.post('/', postBoardValidation);
router.patch('/', patchBoardValidation);
router.delete('/', deleteBoardValidation);
router.post('/like', postBoardLikeValidation);
router.post('/comment', postCommentValidation);
router.patch('/comment', patchCommentValidation);

router.use(checkValidation);

router.post('/', postBoard);
router.patch('/', patchBoard);
router.delete('/', deleteBoard);
router.post('/like', postBoardLike);
router.post('/comment', postComment);
router.patch('/comment', patchComment);

export default router;
