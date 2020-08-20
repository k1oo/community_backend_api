import { body } from 'express-validator';

const patchUserPasswordValidation = [body('password').notEmpty().isString()];

export default patchUserPasswordValidation;
