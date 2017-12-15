const http = require('http');
var loginProto = require('./proto-helper').loginProto;  
var defineProto = require('./proto-helper').defineProto;  

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  var sc_Login = new loginProto.SC_Login();  
  sc_Login.setErrorcode(defineProto.ErrorCode.SUCCESS);
  res.write(responseByUrl(sc_Login, req.url), "binary");
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});


var responseByUrl = function (resp, url) { 
  console.log(url) 
  return resp.serializeBinary()
  // var lastIndex = url.lastIndexOf('.');  
  // if(lastIndex > -1) {  
  //     var suffix = url.substr(lastIndex + 1);  
  //     if (suffix == 'pb') {  
  //         return resp.serializeBinary();  
  //     } else {  
  //         return resp.toObject();  
  //     }  
  // } else {  
  //     return resp.toObject();  
  // }  
};  
