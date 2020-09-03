import { QUERY, SET, WQ } from '../../../../../db';
import { catchDBError } from '../../../../../error';

const patchComment = async (req, res) => {
  const { board_pk, comment_pk, content } = req.body;
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

  if (user.pk != comment.user_pk) {
    return res.status(403).json({
      success: false,
      message: 'forbidden',
    });
  }

  if (!comment) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong data',
    });
  }

  if (comment.content == content) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'please enter a new content',
    });
  }

  await QUERY`
    UPDATE comments
      ${SET({ content })}
      ${WQ({ pk: comment_pk })}`.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'patch comment succeed',
  });
};

export default patchComment;
