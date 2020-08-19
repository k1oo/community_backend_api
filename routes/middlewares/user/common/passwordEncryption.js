import SHA512 from 'crypto-js/sha512';
import Base64 from 'crypto-js/enc-base64';
import dotenv from 'dotenv';

dotenv.config();

const passwordEncryption = async (req, res, next) => {
  const { password } = req.body;
  const secretKey = process.env.PASSWORD_ENCRYPTION_KEY || '';

  try {
    const encryptedPassword = Base64.stringify(SHA512(password, secretKey));

    res.locals.password = encryptedPassword;
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'unhandled error',
    });
  }
};

export default passwordEncryption;
