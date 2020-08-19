import { body } from 'express-validator';

const registerValidation = [
  body('id').notEmpty().isString(),
  body('password').notEmpty().isString(),
  body('nickname').notEmpty().isString(),
];

export default registerValidation;
