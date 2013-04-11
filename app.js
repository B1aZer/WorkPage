
/**
 * Module dependencies.
 */
var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, blog = require('./routes/blog')
, projects = require('./routes/projects')
, http = require('http')
, path = require('path')
, config = require('./config');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('some secret secret here'));
    app.use(express.session());
    // user cookie
    app.use(function(req, res, next){
        if ( req.session.user ) {
            res.locals.user = req.session.user;
            res.locals.authenticated = ! req.session.user.anonymous;
            next();
        }
        else {
            next();
        }
    });
    app.use(app.router);
    app.use(express.staticCache());
    app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
    //app.use(express.static(__dirname+'/public'));
    app.use(express.errorHandler({
        'dumpExceptions': true
        , 'showStack': true
    }));

});

var basicAuthMessage = 'Restricted area, please identify';

/** Basic authentication
 *
 */
var basicAuth = express.basicAuth(function(username, password) {
    if (username === config.user.name && password === config.user.pass) {
        return true;
    }
    else {
        return false;
    }
}, basicAuthMessage);

var checkAuth = function (req, res, next) {
    if (req.session.user) {
        return next();
    }
    else {
        return basicAuth(req, res, next);
    }
}

app.get('/', routes.index);
app.get('/login/', checkAuth, routes.index);
app.get('/users', user.list);
app.get('/blog/new/', blog.create);
app.post('/blog/new/', blog.createfrom);
app.get('/blog/:id/', blog.showpost);
app.get('/blog/', blog.index);
app.get('/edit/:id/', blog.editpost);
app.post('/edit/:id/', blog.editfrom);
app.get('/delete/:id/', checkAuth, blog.deletepost);
app.post('/send/', routes.sendMessage);

app.get('/projects/', projects.index);
app.get('/projects/:id/', projects.single);

app.get('/test/', routes.test);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
