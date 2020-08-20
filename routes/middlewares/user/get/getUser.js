const getUser = async (req, res) => {
  const { user } = res.locals;

  return res.json({
    success: true,
    user: {
      id: user.id,
      nickname: user.nickname,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
  });
};

export default getUser;
