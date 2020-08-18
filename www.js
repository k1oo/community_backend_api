import * as http from 'http';

import app from './app';

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return 0;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return 0;
};

const httpServer = http.createServer(app);
const port = normalizePort(process.env.PORT);

httpServer.listen(port, () => {
  console.log(`Server started on ${port}`);
});
