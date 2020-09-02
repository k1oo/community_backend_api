import _ from 'fxjs/Strict';

import { SQL, WQ, no_del, ASSOCIATE, WanD, CL, QUERY, SET, is_null } from '../../../../db';
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
      }}
      < comments ${{
        left_key: 'pk',
        key: 'board_pk',
        query: SQL`${WQ(is_null('recomment_pk'))}`,
      }}
        - user ${{
          left_key: 'user_pk',
          key: 'pk',
          table: 'users',
          column: CL('nickname'),
        }}
        < comments ${{
          left_key: 'pk',
          key: 'recomment_pk',
        }}
          - user ${{
            left_key: 'user_pk',
            key: 'pk',
            table: 'users',
            column: CL('nickname'),
          }}
      `.catch(catchDBError(res));

  console.log(boards);

  if (!boards.length) {
    return res.status(404).json({
      success: false,
      message: 'not found board',
    });
  }

  const responseData = _.each(
    (obj) => (type == 'list' ? (delete obj['content'], delete obj['comments']) : obj),
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
        comments: _.map(
          (comment) => ({
            pk: comment.pk,
            content: comment.content,
            createdAt: comment.created_at,
            updatedAt: comment.updated_at,
            user: {
              nickname: comment._.user.nickname,
            },
            recomments: _.map(
              (recomment) => ({
                pk: recomment.pk,
                content: recomment.content,
                createdAt: recomment.created_at,
                updatedAt: recomment.updated_at,
                user: {
                  nickname: recomment._.user.nickname,
                },
              }),
              comment._.comments
            ),
          }),
          board._.comments
        ),
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
