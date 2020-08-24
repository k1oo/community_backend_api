import { body } from 'express-validator';

const patchBoardValidation = [
  body('board_pk').notEmpty().isString(),
  body('title').optional().isString(),
  body('content').optional().isString(),
];
export default patchBoardValidation;
