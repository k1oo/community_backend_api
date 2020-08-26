import { QUERY, WQ, VALUES } from '../../../../db';
import { catchDBError } from '../../../../error';

const postBoardLike = async (req, res) => {
  const { board_pk } = req.body;
  const { user } = res.locals;

  const [board] = await QUERY`SELECT * FROM boards ${WQ({ pk: board_pk })}`;

  if (!board) {
    return res.status(412).json({
      success: false,
      code: 412,
      mesage: 'wrong data',
    });
  }

  const [boardLike] = await QUERY`
    SELECT * FROM boardLikes 
      ${WQ({
        user_pk: user.pk,
        board_pk,
      })}`.catch(catchDBError(res));

  if (boardLike) {
    await QUERY`
      DELETE FROM boardLikes
        ${WQ({ pk: boardLike.pk })}  
    `.catch(catchDBError(res));
  } else {
    await QUERY`
      INSERT INTO boardLikes 
        ${VALUES({ user_pk: user.pk, board_pk })}
    `.catch(catchDBError(res));
  }

  return res.json({
    success: true,
    message: 'board like succeed',
  });
};

export default postBoardLike;
