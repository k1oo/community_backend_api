import { query } from 'express-validator';

const deleteBoardValidation = [query('board_pk').notEmpty().isString()];

export default deleteBoardValidation;
