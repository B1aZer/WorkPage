Articles = function(articles){
    this.dummyData = articles;
};

Articles.prototype.getAll = function() {
    return this.dummyData;
};

var Articles = new Articles([
        {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post three', body: 'Body three'}
    ]);  

exports.Articles = Articles;
