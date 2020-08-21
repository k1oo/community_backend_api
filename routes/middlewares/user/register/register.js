import { QUERY, VALUES } from '../../../../db';
import { catchDBError } from '../../../../error';

const register = async (req, res) => {
  const { id, nickname } = req.body;
  const { password } = res.locals;

  await QUERY`
    INSERT INTO users
      ${VALUES([{ id, password, nickname }])}
  `.catch(catchDBError(res));

  return res.json({
    success: true,
    message: 'register succeed',
  });
};

export default register;
