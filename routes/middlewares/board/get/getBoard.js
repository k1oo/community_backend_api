import _ from 'fxjs/Strict';

import { SQL, WQ, no_del, ASSOCIATE, WanD, CL, QUERY, SET } from '../../../../db';
import { catchDBError } from '../../../../error';

const getBoard = async (req, res) => {
  const { type, page } = req.query;
  const { board_pk } = req.body;
  const limit = 5;

  if (type == 'post' && !board_pk) {
    return res.status(412).json({
      success: false,
      message: 'wrong data',
    });
  }

  const boards = await ASSOCIATE`
    boards ${
      type == 'post'
        ? WanD({ pk: board_pk })
        : SQL`${WQ(no_del)} LIMIT ${((page || 1) - 1) * limit}, ${limit}`
    }
      - user ${{
        left_key: 'user_pk',
        key: 'pk',
        table: 'users',
        column: CL('nickname'),
      }}`.catch(catchDBError(res));

  if (!boards.length) {
    return res.status(404).json({
      success: false,
      message: 'not found board',
    });
  }

  const responseData = _.each(
    (obj) => (type == 'list' ? delete obj['content'] : obj),
    _.map(
      (board) => ({
        pk: board.pk,
        title: board.title,
        content: board.content,
        viewCount: board.viewCount,
        createdAt: board.created_at,
        updatedAt: board.updated_at,
        user: {
          nickname: board._.user.nickname,
        },
      }),
      boards
    )
  );

  if (type == 'post') {
    await QUERY`
      UPDATE boards 
        ${SET({
          viewCount: ++responseData[0].viewCount,
        })} 
        ${WQ({
          pk: responseData[0].pk,
        })}`.catch(catchDBError(res));
  }

  return res.json({
    success: true,
    data: {
      board: type == 'list' ? responseData : responseData[0],
    },
  });
};

export default getBoard;
