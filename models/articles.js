var redis = require('redis')
    ,db = redis.createClient(); 

Articles = function(articles){
    this.dummyData = articles;
};

Articles.prototype.getAll = function(callback) {
    var that = this;
    setTimeout((function() {
        callback(that.dummyData);
    }), 5000);

    
};

Articles.prototype.create = function(article, callback) {
    this.dummyData.push(article);
    callback();
};

var Articles = new Articles([
        {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post three', body: 'Body three'}
    ]);  

exports.Articles = Articles;
