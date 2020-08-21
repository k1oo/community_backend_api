import { body } from 'express-validator';

const postBoardValidation = [
  body('title').notEmpty().isString(),
  body('content').notEmpty().isString(),
];

export default postBoardValidation;
