import { body } from 'express-validator';

const postBoardLikeValidation = [body('board_pk').notEmpty().isInt()];

export default postBoardLikeValidation;
