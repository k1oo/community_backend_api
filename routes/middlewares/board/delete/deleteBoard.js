import { WQ, QUERY } from '../../../../db';
import { catchDBError } from '../../../../error';

const deleteBoard = async (req, res) => {
  const { board_pk } = req.query;
  const user = res.locals.user;

  const [board] = await QUERY`
    SELECT * FROM boards 
      ${WQ({ pk: board_pk })}`.catch(catchDBError(res));

  if (!board) {
    return res.status(412).json({
      success: false,
      message: 'wrong data',
    });
  }

  if (user.pk != board.user_pk) {
    return res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }

  await QUERY`
    DELETE FROM boards
      ${WQ({ pk: board.pk })}
  `.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'delete board succeed',
  });
};

export default deleteBoard;
