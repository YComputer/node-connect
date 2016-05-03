var connect = require('connect');
var methodOverride = require('method-override');
var morgan = require('morgan')
var bodyParser = require('body-parser')

function edit(req, res, next) {
  if ('GET' != req.method) return next();
  res.setHeader('Content-Type', 'text/html');
  res.write('<form method="post">');
  res.write('<input type="hidden" name="_method" value="put" />');
  res.write('<input type="text" name="user[name]" value="Tobi" />');
  res.write('<input type="submit" value="Update" />');
  res.write('</form>');
  res.end();
}
function update(req, res, next) {
  console.log('=====',req.originalMethod)
  if ('PUT' != req.method) return next();
  res.end('Updated name to ' + req.body.user.name);
}

var app = connect()
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: true }))
  // .use(bodyParser.json())
  .use(methodOverride('_method'))
  .use(edit)
  .use(update);
app.listen(3000);