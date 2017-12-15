var redis = require("redis");

//var client = redis.createClient(6381,'127.0.0.1',{}); //本机
var client = redis.createClient(6381, '127.0.0.1', {}); //内网
client.on('ready', function (res) {
    console.log('redis connect ready');
})
client.on('end', function (err) {
    console.log('redis connect end');
})
client.on('error', function (err) {
    console.log("redis error");
})


module.exports = {
    getclient: function () {
        return client;
    }
}
