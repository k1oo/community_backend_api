import { body } from 'express-validator';

const patchUserNicknameValidation = [body('nickname').notEmpty().isString()];

export default patchUserNicknameValidation;
