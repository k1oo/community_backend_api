import { MySQL } from 'fxsql';
import { curry, reduce, go } from 'fxjs';
import { not, isFunction, match, identity, flatten, each } from 'fxjs/Strict';
import L from 'fxjs/Lazy';
import dotenv from 'dotenv';

const { CONNECT } = MySQL;

dotenv.config();

export const POOL = CONNECT({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const { QUERY, EQ, SQL, SET } = POOL;

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

export const WQ = (sql) => SQL`WHERE ${toEQ(sql)}`;

export const Wor = (...sqls) => WQ(or(...sqls));

export const findUserByPk = (user_pk) => {
  return QUERY`SELECT * FROM users ${WQ({ pk: user_pk })}`;
};
