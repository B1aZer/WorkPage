
/*
* GET home page.
*/

exports.index = function(req, res){
    if ( req.user && !req.session.user ) {
        req.session.user = req.user;
        res.locals.user = req.user;
    }
    res.render('index', { title: 'Express' });
};

