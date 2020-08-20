import { QUERY, WQ, SET } from '../../../../../db';
import { catchDBError } from '../../../../../error';

const patchNickname = async (req, res) => {
  const { nickname } = req.body;
  const { user } = res.locals;

  if (user.nickname == nickname) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'please enter a new nickname',
    });
  }

  const [existNickname] = await QUERY`SELECT nickname FROM users ${WQ({ nickname })}`.catch(
    catchDBError(res)
  );

  if (existNickname) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'exist nickname',
    });
  }

  await QUERY`UPDATE users ${SET({ nickname })} ${WQ({ pk: user.pk })}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'patch nickname succeed',
  });
};

export default patchNickname;
