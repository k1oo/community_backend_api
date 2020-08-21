import dotenv from 'dotenv';
import { MySQL } from 'fxsql';
import { curry, reduce, go } from 'fxjs';
import { not, isFunction, match, identity, flatten, each } from 'fxjs/Strict';
import L from 'fxjs/Lazy';

const { CONNECT } = MySQL;

dotenv.config();

export const POOL = CONNECT({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const { QUERY, EQ, SQL, SET, VALUES, CL, ASSOCIATE } = POOL;

export const toEQ = (v) => {
  return match(v).case(isFunction)(identity).else(EQ);
};

export const merge = curry((sep = SQL``, ...sqls) =>
  go(
    sqls,
    flatten,
    L.reject(not),
    L.map(toEQ),
    L.filter((sql) => sql().text),
    ([head, ...tail]) =>
      !head ? SQL`` : SQL`(${reduce((acc, sql) => SQL`${acc} ${sep} ${sql}`, head, tail)})`
  )
);

export const or = merge(SQL`OR`);
export const and = merge(SQL`AND`);
export const anD = (...sqls) => and(...sqls, no_del);

export const WQ = (sql) => SQL`WHERE ${toEQ(sql)}`;

export const Wor = (...sqls) => WQ(or(...sqls));
export const WanD = (...sqls) => WQ(anD(...sqls));

export const findUserByPk = (user_pk) => {
  return QUERY`SELECT * FROM users ${WQ({ pk: user_pk })}`;
};

const is_null = (cl) => SQL`${CL(cl)} IS NULL`;

export const no_del = is_null('deleted_at');
