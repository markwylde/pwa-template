const basictap = require('basictap');
const http = require('http');
const servatron = require('servatron');

const staticHandler = servatron({
  directory: './public',
  spa: true
});

const server = http.createServer(staticHandler);
server.listen();

basictap.on('finish', () => {
  server.close();
});

module.exports = server;
