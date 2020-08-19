import { Wor, QUERY, EQ } from '../../../../db';
import { catchDBError } from '../../../../error';

const checkExistUser = async (req, res, next) => {
  const { id, nickname } = req.body;

  const user = await QUERY`
    SELECT * FROM users
      ${Wor({ id }, { nickname })}
  `.catch(catchDBError(res));

  switch (req.path) {
    case '/register':
      user.length ? res.status(412).json({ success: false, message: 'exist user' }) : next();
      break;
    case '/login':
      !user.length
        ? res.status(412).json({ success: false, message: 'not found user' })
        : ((res.locals.user = user), next());
      break;
  }
};

export default checkExistUser;
