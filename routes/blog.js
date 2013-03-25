
/*
 * GET Blog.
 */

var Articles = require('../models/articles').Articles;




exports.index = function(req, res){
     
    res.render('blog', { title: 'Blog' , articles: Articles.getAll()});
};

