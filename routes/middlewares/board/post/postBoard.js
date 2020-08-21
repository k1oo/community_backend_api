import { QUERY, VALUES } from '../../../../db';
import { catchDBError } from '../../../../error';

const postBoard = async (req, res) => {
  const { title, content } = req.body;
  const { user } = res.locals;

  await QUERY`
    INSERT INTO boards 
      ${VALUES({ user_pk: user.pk, title, content })}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'post board succeed',
  });
};

export default postBoard;
