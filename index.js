var connect = require('connect')
var cookieParser = require('cookie-parser')
var qs = require('qs')
var query = require('connect-query');
var favicon = require('serve-favicon');
var app = connect()

function logger(req, res, next) {
    console.log('req.method: %s res.url: %s', req.method, res.url)
    next()
}

function hello(req, res) {
    // res.setHeader('Content-Type', 'text/plain')
    // res.end('hello word')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.query))

}

function authenticateWithDatabase(user, pass, cb){
	if(user == 'tobi') cb(null)
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization
    if (!authorization) return next(new Error('Unauthorized'))
    var parts = authorization.split(' ')
    var scheme = parts[0]
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    authenticateWithDatabase(user, pass, function(err) {
        if (err) return next(err)
        next()
    })
}

function admin(req, res, next){
	switch (req.url){
		case '/':
			res.end('try /users')
			break
		case '/users':
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify(['tobi', 'loki', 'jane']))
			break
	}
}


// app.use(logger)
// app.use('/admin', restrict)
// app.use('/admin', admin)
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser())
app.use(query())
app.use(hello)
app.listen(3000)
