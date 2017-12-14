const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

// app.get('/', function(req, res){
//   // res.sendFile(__dirname + '/index.html');
//   res.end("hello client")
// });

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log('connection a user');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("reply: %s",message);
  });
  ws.on("close", function incoming(code,reason) {
    console.log('close: %s', reason);
  });
  ws.on("error", function incoming(err){
    console.log('error: %s', err.message);
  });

  // ws.send('something');
  // ws.close()

  // if (ws) {
  //   ws.onerror = ws.onopen = ws.onclose = null;
  //   ws.close();
  // }
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});