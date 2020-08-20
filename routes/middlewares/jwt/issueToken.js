import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const issueToken = async (_, res) => {
  const { pk } = res.locals.user;

  try {
    const token = jwt.sign({ pk: pk }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

    return res.json({
      success: true,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'unhandled error',
    });
  }
};

export default issueToken;
