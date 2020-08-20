import { body } from 'express-validator';

const loginValidation = [body('id').notEmpty().isString(), body('password').notEmpty().isString()];

export default loginValidation;
