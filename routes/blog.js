
/**
 * Convert Date object into string
 * @param {String} dateval Date object
 */
var getDate = function (dateval) {
                var d = new Date(parseInt(dateval)); 
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();
                
                return curr_date + "/" + curr_month + "/" + curr_year;;
            }

/**
 * Merge 2 objects in 1
 * @param {Object} obj1 Object 1
 * @param {Object} obj2 Object 2
 */
var mergeObj = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

/**
 * Replace new lines with <p>
 * @param {text} body Article text
 */
var parseArticle = function (body) {
    //var body = body.replace(/\n/g, '<br />'); 
    var body = '<p>'+body.replace(/[\r\n]+(?=[^\r\n])/g,'</p><p>')+'</p>';
    return body;
}

var Articles = require('../models/articles').Articles;

exports.index = function(req, res){
     
    Articles.getAll( function(articles) {
        res.render('blog', { 
            title: 'Blog' 
            , articles: articles
            , getDate: getDate 
        });
    });
};

exports.create = function(req, res){

        res.render('blogNew', { title: 'Blog' });
}; 

exports.createfrom = function(req, res, next){

    var body = parseArticle(req.param('body'));
    var article = {
        title: req.param('title'),
        body: body,
        created_at: (new Date()).getTime()
    }

    Articles.create( article, function(err, data) {
        if (err) next(err);
        else res.redirect('/blog/');
        }
    );
}; 

exports.showpost = function (req, res, next) {
    var id = req.params.id;
    Articles.getSingleById( id, function(err, data) {
        if (err) next(err);
        else res.render('post', {
            title: data.title
            , article: data
            , getDate: getDate 
            });
    });
}

exports.editpost = function (req, res, next) {
    var id = req.params.id;
    Articles.getSingleById( id, function(err, data) {
        if (err) next(err);
        else res.render('blogNew', {
            title: data.title
            , article: data
            });
    });
}

exports.editfrom = function (req, res, next) {
    var id = req.params.id;
    var body = parseArticle(req.param('body'));
    var newArticle = {
        title: req.param('title'),
        body: body,
    }
    Articles.getSingleById( id, function(err, article) {
        if (err) next(err);
        else {
            editedArticle = mergeObj(article, newArticle);
            Articles.edit( editedArticle, function(err, data) {
                if (err) next(err);
                else res.redirect('/blog/');
            });
        }
    });
}

exports.deletepost = function (req, res, next) {
    var id = req.params.id;
    Articles.deleteById( id, function(err, article) {
        if (err) next(err);
        else res.redirect('/blog/');
    });
}



