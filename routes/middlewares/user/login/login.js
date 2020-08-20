const login = (_, res, next) => {
  const user = res.locals.user;
  const encryptedPassword = res.locals.password;

  if (user.password != encryptedPassword) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong password',
    });
  }

  next();
};

export default login;
