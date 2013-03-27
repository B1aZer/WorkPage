
/*
 * GET Blog.
 */

var getDate = function (dateval) {
                var d = new Date(parseInt(dateval)); 
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();
                
                return curr_date + "/" + curr_month + "/" + curr_year;;
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
     
    res.render('blog_new', { title: 'Blog' });
}; 

exports.createfrom = function(req, res, next){

    var body = req.param('body').replace(/\n/g, '<br />');
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

