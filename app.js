
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , blog = require('./routes/blog')
  , http = require('http')
  , path = require('path')
  


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({
		'dumpExceptions': true
		, 'showStack': true
	}));

});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/blog/new/', blog.create);
app.get('/blog/:id/', blog.showpost);
app.get('/blog/', blog.index);
app.post('/blog/new/', blog.createfrom);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
