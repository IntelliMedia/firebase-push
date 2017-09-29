var http = require('http');

var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});

console.info("Waiting for connections on port " + port);
server.listen(port);