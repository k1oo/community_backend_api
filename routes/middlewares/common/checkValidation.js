import { validationResult } from 'express-validator';

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong data',
    });
  }

  next();
};

export default checkValidation;
