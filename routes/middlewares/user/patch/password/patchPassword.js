import { QUERY, SET, WQ } from '../../../../../db';
import { catchDBError } from '../../../../../error';

const patchPassword = async (_, res) => {
  const { password, user } = res.locals;

  if (user.password == password) {
    return res.status(412).json({
      success: true,
      code: 412,
      message: 'please enter a new password',
    });
  }

  await QUERY`UPDATE users ${SET({ password })} ${WQ({ pk: user.pk })}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'patch password succeed',
  });
};

export default patchPassword;
