import { Router } from 'express';

// common
import checkValidation from '../middlewares/common/checkValidation';
import checkExistUser from '../middlewares/user/common/checkExistUser';
import passwordEncryption from '../middlewares/user/common/passwordEncryption';

// jwt
import issueToken from '../middlewares/jwt/issueToken';
import verifyToken from '../middlewares/jwt/verifyToken';

// register
import registerValidation from '../middlewares/user/register/_validation';
import register from '../middlewares/user/register/register';

// login
import loginValidation from '../middlewares/user/login/_validation';
import login from '../middlewares/user/login/login';

// patchPassword
import patchPassword from '../middlewares/user/patch/password/patchPassword';
import patchUserPasswordValidation from '../middlewares/user/patch/password/_validation';

// patchNickname
import patchUserNicknameValidation from '../middlewares/user/patch/nickname/_validation';
import patchNickname from '../middlewares/user/patch/nickname/patchNickname';

const router = Router();

router.post('/register', registerValidation);
router.post('/login', loginValidation);
router.patch('/password', patchUserPasswordValidation);
router.patch('/nickname', patchUserNicknameValidation);

router.use(checkValidation);

router.post('/register', checkExistUser, passwordEncryption, register);
router.post('/login', checkExistUser, passwordEncryption, login, issueToken);

router.use(verifyToken);

router.patch('/password', passwordEncryption, patchPassword);
router.patch('/nickname', patchNickname);

export default router;
