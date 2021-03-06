var redis = require('redis')
    ,db = redis.createClient(); 

var BLOG_POST = 'post'
    , BLOG_LIST = 'postings';

/**
 * Initialize with dummy data
 * (for tests)
 */
Articles = function(articles){
    this.dummyData = articles || [];
};

/**
 * Get all articles
 */
Articles.prototype.getAll = function(callback) {
    var that = this;
    var articles = [];
    //var startDate = (new Date(2012, 5, 1)).getTime() ; // June 1st
    //var endDate = (new Date(2012, 5, 30)).getTime(); // June 30th
    db.ZREVRANGEBYSCORE(BLOG_LIST, '+inf', '-inf', function(err, posts){
    //db.zrange(BLOG_LIST, 0, 10, function(error, posts){
         function loop(el) {
            if (el) {
                that.getSingleById(el, function(err, res) {
                    articles.push(res);
                    return loop(posts.shift());
                });
            }
            else {
                callback(articles);
            }
        }
        loop(posts.shift());
    });

    
};

/**
 * Get single article by ID
 */
Articles.prototype.getSingleById = function(id, callback) {
    db.hgetall(BLOG_POST + ':' + id, function (err, obj) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, obj);
        }
    });

};

/**
 * Create new article
 */
Articles.prototype.create = function(article, callback) {
    //this.dummyData.push(article);
    db.INCR(BLOG_POST, function (err, res) {
        var id = res;
        article.id = id;
        db.HMSET(BLOG_POST+':'+id, article, function (err, res) {
            if (err) callback(err);
            else {
                var dateCreated = article.created_at;
                // adding to srted list for future reference
                db.ZADD(BLOG_LIST, dateCreated, id, function (err,res) {
                    callback(err, res);
                });
            }
        });
    });
};

/**
 * Edit article
 */
Articles.prototype.edit = function(article, callback) {
    var id = article.id;
    db.HMSET(BLOG_POST+':'+id, article, function (err, res) {
        if (err) callback(err);
        else {
            callback(null, res);
        }
    });
};
           
/**
 * Delete single article
 */
Articles.prototype.deleteById = function(id, callback) {
    db.DEL(BLOG_POST+':'+id, function (err, res) {
        if (err) callback(err);
        else {
            db.ZREM(BLOG_LIST, id, function (err, res) {
                if (err) allback(err); 
                else callback(null, res);
            });
        }
    });
}


/**
 * For test purpose
 */
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
