import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan());

app.use((_, res) => {
  return res.status(404).json({
    success: false,
    message: 'not found page',
  });
});

export default app;
