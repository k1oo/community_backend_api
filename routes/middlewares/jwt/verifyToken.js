import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { findUserByPk } from '../../../db';
import { catchDBError } from '../../../error';

dotenv.config();

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(403).json({
      success: false,
      code: 403,
      message: 'forbidden',
    });
  }

  try {
    const { pk } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const [user] = await findUserByPk(pk).catch(catchDBError(res));

    if (!user) {
      return res.status(412).json({
        success: false,
        code: 412,
        mesasge: 'wrong request',
      });
    }

    res.locals.user = user;
    next();
  } catch (e) {
    switch (e.name) {
      case 'JsonWebTokenError':
        return res.status(412).json({
          success: false,
          code: 412,
          message: 'token error',
        });
      case 'TokenExpiredError':
        return res.status(401).json({
          success: false,
          code: 401,
          message: 'token expired',
        });
      default:
        return res.status(500).json({
          success: false,
          code: 500,
          message: 'unhandled error',
        });
    }
  }
};

export default verifyToken;
