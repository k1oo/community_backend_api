import { body } from 'express-validator';

const postCommentValidation = [
  body('board_pk').notEmpty().isInt(),
  body('content').notEmpty().isString(),
  body('comment_pk').optional().isInt(),
];

export default postCommentValidation;
