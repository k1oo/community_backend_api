import { WQ, QUERY, SET } from '../../../../db';
import { catchDBError } from '../../../../error';

const patchBoard = async (req, res) => {
  const { board_pk, title, content } = req.body;
  const user = res.locals.user;

  const [board] = await QUERY`SELECT * FROM boards ${WQ({ pk: board_pk })}`.catch(
    catchDBError(res)
  );

  if (user.pk != board.user_pk) {
    return res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }

  if (!board) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong request',
    });
  }

  if (board.title == title && board.content == content) {
    return res.status(412).json({
      succesS: false,
      code: 412,
      mesage: 'please enter new title or content',
    });
  }

  await QUERY`
    UPDATE boards 
      ${SET({ title, content })} 
      ${WQ({ pk: board.pk })}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'patch board succeed',
  });
};

export default patchBoard;
