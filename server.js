const http = require('http');
const path = require('path');
const express = require('express');

const STATIC_FOLDER = 'dist';
const DEFAULT_PORT = 3000;

httpServer = () => {
  const httpApp = express();
  httpApp.use(express.static(`${__dirname}/${STATIC_FOLDER}`));
  httpApp.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, STATIC_FOLDER, 'index.html'));
  });

  const port = process.env.PORT || DEFAULT_PORT;
  http.createServer(httpApp).listen(port, () => {console.log(`HTTP listening port ${port}...`)});
}

httpServer();
