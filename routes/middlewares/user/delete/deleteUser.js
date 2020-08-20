import { QUERY, WQ } from '../../../../db';
import { catchDBError } from '../../../../error';

const deleteUser = async (_, res) => {
  const { user } = res.locals;

  await QUERY`DELETE FROM users ${WQ(user)}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'sign out succeed',
  });
};

export default deleteUser;
