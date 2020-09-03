import { QUERY, WQ } from '../../../../../db';
import { catchDBError } from '../../../../../error';

const deleteComment = async (req, res) => {
  const { board_pk, comment_pk } = req.query;
  const user = res.locals.user;

  const [board] = await QUERY`
    SELECT * FROM boards
      ${WQ({ pk: board_pk })}`.catch(catchDBError(res));

  if (!board) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong data',
    });
  }

  const [comment] = await QUERY`
    SELECT * FROM comments
      ${WQ({ pk: comment_pk })}`.catch(catchDBError(res));

  if (!comment) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong data',
    });
  }

  if (user.pk != comment.user_pk) {
    return res.status(403).json({
      success: false,
      code: 403,
      message: 'forbidden',
    });
  }

  await QUERY`
    DELETE FROM comments
      ${WQ(comment)}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'delete comment succeed',
  });
};

export default deleteComment;
