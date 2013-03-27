
/*
 * GET Blog.
 */

var Articles = require('../models/articles').Articles;

exports.index = function(req, res){
     
    Articles.getAll( function(articles) {
        console.log(articles);
        res.render('blog', { 
            title: 'Blog' 
            , articles: articles
            , getDate: function(dateval) {
                var d = new Date(parseInt(dateval)); 
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();
                
                return curr_date + "/" + curr_month + "/" + curr_year;;
            }
        });
    });
};

exports.create = function(req, res){
     
    res.render('blog_new', { title: 'Blog' });
}; 

exports.createfrom = function(req, res, next){

    var article = {
        title: req.param('title'),
        body: req.param('body'),
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
        else res.render('post', {title: data.title, article: data});
    });
}

