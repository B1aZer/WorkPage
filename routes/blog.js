
/*
 * GET Blog.
 */

var Articles = require('../models/articles').Articles;

exports.index = function(req, res){
     
    Articles.getAll( function(articles) {
        res.render('blog', { title: 'Blog' , articles: articles });
    });
};

exports.create = function(req, res){
     
    res.render('blog_new', { title: 'Blog' });
}; 

exports.createfrom = function(req, res){

    Articles.create({
        title: req.param('title'),
        body: req.param('body')
    }, function(err) {
        res.redirect('/blog/');
        }
    );

    
     
}; 

