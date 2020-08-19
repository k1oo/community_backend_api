import { Router } from 'express';

// validation
import registerValidation from '../middlewares/user/register/_validation';

// common
import checkValidation from '../middlewares/common/checkValidation';
import checkExistUser from '../middlewares/user/common/checkExistUser';
import passwordEncryption from '../middlewares/user/common/passwordEncryption';

// register
import register from '../middlewares/user/register/register';

const router = Router();

router.post('/register', registerValidation);

router.use(checkValidation);

router.post('/register', checkExistUser, passwordEncryption, register);

export default router;
