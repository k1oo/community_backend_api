import { query, body } from 'express-validator';

const boardType = ['list', 'post'];

const getBoardValidation = [
  query('type')
    .notEmpty()
    .isString()
    .custom((v) => boardType.includes(v)),
  query('page').optional().isInt({ min: 1, max: 1000 }),
  body('board_pk').optional().isInt(),
];

export default getBoardValidation;
