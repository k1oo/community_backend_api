export const catchDBError = (res) => (err) => {
  console.log(err);
  throw res.status(500).json({
    success: false,
    code: 500,
    message: 'database error',
  });
};
