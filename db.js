import { MySQL } from 'fxsql';
import dotenv from 'dotenv';

const { CONNECT } = MySQL;

dotenv.config();

export const POOL = CONNECT({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
