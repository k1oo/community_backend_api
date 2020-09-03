import { body } from 'express-validator';

const patchCommentValidation = [
  body('board_pk').notEmpty().isInt(),
  body('comment_pk').notEmpty().isInt(),
  body('content').notEmpty().isInt(),
];

export default patchCommentValidation;
