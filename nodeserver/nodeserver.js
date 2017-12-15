const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

var loginProto = require('./proto/proto-helper').loginProto;  
var defineProto = require('./proto/proto-helper').defineProto;

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log('connection a user');
  ws.on('message', function incoming(reqData) {
    // 接受请求数据并打印
    var id = reqData.readUInt16LE();
    console.log(id);
    var messageBuffer = new Uint8Array(reqData);
    var cs_Login = loginProto.CS_Login.deserializeBinary(messageBuffer);
    console.log('received: %s  %s', cs_Login.getId(),cs_Login.getName());

    // 回复请求
    var sc_Login = new loginProto.SC_Login();
    sc_Login.setCode(1);   
    sc_Login.setId(9999);
    var rmessageBuffer = new Buffer(sc_Login.serializeBinary()); //Uint8Array
    var resData = new Buffer(rmessageBuffer.byteLength + 2);
    resData.writeUInt16LE(1001);
    rmessageBuffer.copy(resData,2);
    ws.send(resData);
  
    // ws.close()
  });
  ws.on("close", function incoming(code,reason) {
    console.log('close: %s', reason);
  });
  ws.on("error", function incoming(err){
    console.log('error: %s', err.message);
  });

  // ws.send('something');

  // if (ws) {
  //   ws.onerror = ws.onopen = ws.onclose = null;
  //   ws.close();
  // }
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});