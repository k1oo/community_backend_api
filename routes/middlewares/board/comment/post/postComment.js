import { QUERY, WQ, VALUES, is_null, Wand } from '../../../../../db';
import { catchDBError } from '../../../../../error';

const postComment = async (req, res) => {
  const { board_pk, content, comment_pk } = req.body;
  const user_pk = res.locals.user.pk;

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
      ${Wand({ pk: comment_pk || null }, is_null('recomment_pk'), { board_pk })}`.catch(
    catchDBError(res)
  );

  if (comment_pk && !comment) {
    return res.status(412).json({
      success: false,
      code: 412,
      message: 'wrong data',
    });
  }

  await QUERY`
    INSERT INTO comments
      ${VALUES({ board_pk, recomment_pk: comment_pk || null, content, user_pk })}
  `.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'post comment succeed',
  });
};

export default postComment;
