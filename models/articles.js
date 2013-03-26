var redis = require('redis')
    ,db = redis.createClient(); 

var BLOG_POST = 'post'
    , BLOG_LIST = 'postings';

Articles = function(articles){
    this.dummyData = articles || [];
};

Articles.prototype.getAll = function(callback) {
    var that = this;
    var articles = [];
    db.zrange(BLOG_LIST, 0, 10, function(error, posts){
         function loop(el) {
            if (el) {
                console.log('in:');
                db.hgetall(BLOG_POST + ':' + el, function (err, obj) {
                    console.log('in');
                    articles.push(obj);
                    return loop(posts.shift());
                });
            }
            else {
                console.log('out');
                callback(articles);
            }
        }
        loop(posts.shift());
    });

    
};

Articles.prototype.create = function(article, callback) {
    //this.dummyData.push(article);
    db.INCR(BLOG_POST, function (err, res) {
        var id = res;
        db.HMSET(BLOG_POST+':'+id, article, function (err, res) {
            var dateCreated = (new Date(2012, 5, 1)).getTime();
            db.ZADD(BLOG_LIST, dateCreated, id, function (err,res) {
                callback(err, res);
            });
        });
    });
};

var Articles = new Articles([
        {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post three', body: 'Body three'}
    ]);  

exports.Articles = Articles;
