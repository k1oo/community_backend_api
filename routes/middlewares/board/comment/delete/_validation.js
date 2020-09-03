import { query } from 'express-validator';

const deleteCommentValidation = [
  query('board_pk').notEmpty().isInt(),
  query('comment_pk').notEmpty().isInt(),
];

export default deleteCommentValidation;
