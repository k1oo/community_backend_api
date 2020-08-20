import { Router } from 'express';

// common
import checkValidation from '../middlewares/common/checkValidation';
import checkExistUser from '../middlewares/user/common/checkExistUser';
import passwordEncryption from '../middlewares/user/common/passwordEncryption';

// register
import registerValidation from '../middlewares/user/register/_validation';
import register from '../middlewares/user/register/register';

// login
import loginValidation from '../middlewares/user/login/_validation';
import login from '../middlewares/user/login/login';
import issueToken from '../middlewares/jwt/issueToken';

const router = Router();

router.post('/register', registerValidation);
router.post('/login', loginValidation);

router.use(checkValidation);

router.post('/register', checkExistUser, passwordEncryption, register);
router.post('/login', checkExistUser, passwordEncryption, login, issueToken);

export default router;
