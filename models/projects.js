var redis = require('redis')
    ,db = redis.createClient(); 

Projects = function(projects){
    this.projects = projects || [];
};

Projects.prototype.getAll = function(callback) {
    callback(this.projects);
    
};

Projects.prototype.getSingleById = function(id, callback) {
    var obj = this.projects[parseInt(id)-1];
    callback(null, obj);
};

/**
 * JSON database for projects
 */
var Projects = new Projects([
        {
            id: '1',
            title: 'LionFace', 
            image: '/images/projects/1.png',
            desc: 'Lionface is a new-age social startup. There are three primary goals of Lionface: maintain an environment free of visual clutter, protect and respect people\'s privacy down to the smallest detail, and contribute to the community in a meaningful and positive way.',
            description: '<p>Lionface is a startup focused primary on nonprofit organizations and social interactions. This project is a result of half-year work in collaboration with Nick Clark as a designer and a founder.</p><p>Server code is written in python with the help of the <a href="https://www.djangoproject.com/" target="_blank">django framework</a>. MySQL was chosen as the main database. <a href="http://redis.io/" target="_blank">Redis</a> is used as a support key-value storage for it\'s simplicity and pub/sub functional. To achieve seamless client/server interaction <a href="http://socket.io/" target="_blank">SocketIO</a> was used. <a href="http://gunicorn.org/" target="_blank">Gunicorn</a> with <a href="http://www.gevent.org/" target="_blank">gevent</a> integration is backing up socketio on the server side. While JQuery simplifies most user actions. One of the <a href="http://en.wikipedia.org/wiki/Shortest_path_problem" target="_blank">Shortest path algorithms</a> was utilized in this project. Lionface is hosted on Amazon EC2 and uses <a href="http://aws.amazon.com/rds/" target="_blank">RDS</a> as database storage</p><p>Working on Lionface gave me a glimpse of startup ecosystem and improved my team skills. That was a rich experience.</p>',
            date: new Date('2013', '02', '28'),
            tags: ['django', 'python', 'javascript'],
            url: 'http://lionface.org'
        },
        {
            id: '2',
            title: 'JoinMe', 
            image: '/images/projects/2.png',
            desc: 'JoinMe is a Kikstarter analogue. It has reddit-like categories structure and geotagging features. This is a side project, was born as a proof of concept.',
            description: '<p>JoinMe is a crowdfunding prototype. The main idea behind this project was to unite crowdfunding platform with public meetings. To simplify search reddit-like tags were used.</p> <p>JoinMe based on PostrgreSQL database. <a href="http://flask.pocoo.org/" target="_blank">Flask framework</a> is in the core for it\'s great plugin collection and minimalistic architecture. Google Maps API is used for geotagging functional, Facebook and Twitter APIs as a login backends. Client interface is built with the help of <a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter Bootstrap</a>. This project is hosted on <a href="http://www.heroku.com/" target="_blank">Heroku</a>.</p>',
            date: new Date('2012', '04', '15'),
            tags: ['flask', 'python'],
            url: 'http://vivid-beach-2176.herokuapp.com/'
        },
        {
            id: '3',
            title: 'Blog Platform', 
            image: '/images/projects/3.png',
            desc: 'Blog engine written in python. Simple blog with basic functions. Was born on Odesk.',

            description: '<p>Blog platform that uses <a href="http://mezzanine.jupo.org/" target="_blank">Mezzanine</a> as it\'s core. This is a two week project that is filled with dummy content, since original content is owned by the employee.</p> <p>This is an original blog site that allows users to rate celebrity couples. It was built in Python and using the Django framework. AJAX functions were used as needed. This is a HTML5 enabled backend CMS, that aims to prevent any security risks.</p>',
            date: new Date('2012', '07', '07'),
            tags: ['django', 'python'],
            url: 'http://pure-cloud-1424.herokuapp.com/'
        },
        {
            id: '4',
            title: 'Pretty Girls', 
            image: '/images/projects/4.png',
            desc: 'Pretty Girls is a simple Flash project. Uses fancy template and background music. Was born as a proof of concept.',
            description: '<p>Pretty Girls is flash website. The main goal was to improve knowledge of Flash and ActionScript technologies.</p><p>Project is hosted on <a href="https://developers.google.com/appengine/" target="_blank">Google App Engine.</a></p>',
            date: new Date('2011', '05', '10'),
            tags: ['flash', 'python'],
            url: 'http://pretty-girls.appspot.com/'
        },
        {
            id: '5',
            title: 'Domain Database', 
            image: '/images/projects/5.png',
            desc: 'Simple web database. Project was born on Odesk.',
            description: '<p>Domain Database is a simple HTML5 web management platform for domain owners. Filled with dummy content.</p><p>Project is backed up by django on the sever side and Twitter bootstrap on the client.  This project includes SQLite Database and basic client interface. Project is hosted on heroku.</p>',
            date: new Date('2011', '05', '1'),
            tags: ['django', 'jquery'],
            url: 'http://shielded-basin-7432.herokuapp.com/'
        },
        {
            id: '6',
            title: 'Greeting Card', 
            image: '/images/projects/6.png',
            desc: 'Simple Greeting Card made for a freind.',
            description: '<p>This project is just a greeting card, made by occassion.</p><p>Server code is written in flask. <a href="http://vk.com/developers.php" target="_blank">Vkontakte API</a> is used for a congratulation feed, JQuery plugin for an image rollover. Project is hosted on heroku.</p>',
            date: new Date('2012', '04', '14'),
            tags: ['flask', 'jquery'],
            url: 'http://severe-wind-7082.herokuapp.com/'
        },
        {
            id: '7',
            title: 'Social Feed', 
            image: '/images/projects/7.png',
            desc: 'Social Feed is an aggregator for social websites. Was born as a proof of concept.',
            description: '<p>Social Feed is a project that unites feeds from different social networks (Facebook, Twitter, Vkontakte).</p><p>Server code is served by django. Javascript is used for API integration and content parsing. PostgreSQL is a backend database. Project is hosted on heroku.</p>',
            date: new Date('2011', '08', '02'),
            tags: ['django', 'jquery'],
            url: 'http://furious-winter-6262.herokuapp.com/'
        },
        {
            id: '8',
            title: 'WordPress Blog', 
            image: '/images/projects/8.png',
            desc: 'WordPress blog with custom plugins and design. Was born as a proof of concept.',
            description: '<p>This is a stanalone <a href="http://wordpress.com/" target="_blank">WordPress</a> blog.</p> <p> The main idea was to enrich blog experience with custom features, including rss parsing and scheduled tasks. This project is hosted on Amazon EC2 instance.</p>',
            date: new Date('2011', '03', '03'),
            tags: ['php', 'javascript'],
            url: 'http://23.23.193.121/wp/'
        }
    ]);  

exports.Projects = Projects;

