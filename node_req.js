// var http = require('http')

// var server = http.createServer(function(req, res) {
//     console.log(req.body)
//     console.log(server)
//     res.write('Hello word')
//     res.end()
// })

// server.listen(3000)

var connect = require('connect');
var cookieParser = require('cookie-parser')

var app = connect()
  .use(cookieParser('tobi is a cool ferret'))
  .use(function(req, res){
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('hello\n');
  }).listen(3000);
