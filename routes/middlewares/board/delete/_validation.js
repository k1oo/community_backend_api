import { query } from 'express-validator';

const deleteBoardValidation = [query('board_pk').notEmpty().isInt()];

export default deleteBoardValidation;
