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


var Projects = new Projects([
        {
            id: '1',
            title: 'LionFace', 
            image: '/images/projects/1.png',
            desc: 'Lionface is a new-age social startup. There are three primary goals of Lionface: maintain an environment free of visual clutter, protect and respect people\'s privacy down to the smallest detail, and contribute to the community in a meaningful and positive way.',
            description: '<p>Lionface is a startup focused primary on nonprofit organizations and social interactions. This project is a result of half-year work in collaboration with Nick Clark as a designer and a founder.</p><p>Server code is written in python with the help of the <a href="https://www.djangoproject.com/">django framework</a>. MySQL was chosen as the main database. <a href="http://redis.io/">Redis</a> is used as a support key-value storage for it\'s simplicity and pub/sub functional. To achive seamless client/server intercation <a href="http://socket.io/">SocketIO</a> was used. <a href="http://gunicorn.org/">Gunicorn</a> with <a href="http://www.gevent.org/">gevent</a> integration is backing up socketio on the server side. While JQuery simplifies most clent ineractivity. One of the <a href="http://en.wikipedia.org/wiki/Shortest_path_problem">Shortest path algorithms</a> was utilized in this project. Lionface is hosted on amazon ec2 and uses rds as database storage</p><p>Working on Lionface gave me a glimpse of startup ecosystem and improved my team skills. That was a rich experience.</p>',
            date: new Date('2013', '02', '28'),
            tags: ['django', 'python', 'javascript'],
            url: 'http://lionface.org'
        },
        {
            id: '2',
            title: 'JoinMe', 
            image: '/images/projects/2.png',
            desc: 'JoinMe is a Kikstarter analogue. It has reddit-like categories and geotagging features. This is a side project, born as a proof of concept.',
            description: '<p>JoinMe is a crowdfunding prototype. The main idea behind this project was to unite crowdfunding platform with public meetings. To simplify search reddit-like tags were used</p> <p>JoinMe based on PostrgreSQL database. <a href="http://flask.pocoo.org/">Flask framework</a> is in the core for it\'s great plugin collection and minimalism. Google Maps API is used for geotagging functional. And client interface is built with the help of <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>. This project is hosted on <a href="http://www.heroku.com/">Heroku</a>.</p>',
            date: new Date('2012', '04', '15'),
            tags: ['flask', 'python'],
            url: 'http://vivid-beach-2176.herokuapp.com/'
        },
        {
            id: '3',
            title: 'Blog Platform', 
            image: '/images/projects/3.png',
            desc: 'Blog engine written in python. Simple blog with basic functions. Was born on odesk.',

            description: '<p>Blog platform that uses <a href="http://mezzanine.jupo.org/">Mezzanine</a> as it\'s core. This is a two week project that is filled with dummy content since original content is owned by the employee.</p> <p>This is an original blog site that allows users to rate celebrity couples. It was built in Python and using the Django framework. AJAX functions were used as needed. This is a HTML5 enabled back‐end CMS, that aims to prevent any security risks.</p>',
            date: new Date('2012', '07', '07'),
            tags: ['django', 'python'],
            url: 'http://pure-cloud-1424.herokuapp.com/'
        },
        {
            id: '4',
            title: 'Pretty Girls', 
            image: '/images/projects/4.png',
            desc: 'Pretty Girls is a simple flash project. Uses fancy template and background music. Was born as a proof of concept.',
            description: '<p>Pretty Girls is flash website. The main goal was to improve knowledge of flash and actionscript technilogies.</p><p>Project is hosted on <a href="https://developers.google.com/appengine/">Google App Engine.</a></p>',
            date: new Date('2011', '05', '10'),
            tags: ['flash', 'python'],
            url: 'http://pretty-girls.appspot.com/'
        },
        {
            id: '5',
            title: 'HTML5 Database', 
            image: '/images/projects/5.png',
            desc: 'Simple web database',
            description: 'Project by request. Simple web database, backed up by django on the sever side and Twitter bootstrap on the client.  This project includes: SQL3 Database, Twitter Bootstrap Framework, Django.',
            date: new Date('2011', '05', '1'),
            tags: ['web', 'development'],
            url: 'http://shielded-basin-7432.herokuapp.com/'
        },
        {
            id: '6',
            title: 'Greeting Card', 
            image: '/images/projects/6.png',
            desc: 'Simple Greeting Card made with Twitter Bootstrap and Flask',
            description: 'Simple Greeting Card made with Twitter Bootstrap and Flask',
            date: new Date('2012', '04', '14'),
            tags: ['web', 'development'],
            url: 'http://severe-wind-7082.herokuapp.com/'
        },
        {
            id: '7',
            title: 'Social Feed', 
            image: '/images/projects/7.png',
            desc: 'Social APIs',
            description: 'Project that unites feeds from different social networks (Facebook, Twitter, Vkontakte).  This project includes: Social API implementation, JQuery Framework, Django Framework, PostgreSQL Database.',
            date: new Date('2011', '08', '02'),
            tags: ['web', 'development'],
            url: 'http://furious-winter-6262.herokuapp.com/'
        },
        {
            id: '8',
            title: 'WordPress Blog', 
            image: '/images/projects/8.png',
            desc: 'WordPress blog',
            description: 'WordPress blog.  This project includes: Theme Design, WordPress Plugin Development, Web Server Configuration.',
            date: new Date('2011', '03', '03'),
            tags: ['web', 'development'],
            url: 'http://23.23.193.121/wp/'
        },
        {
            id: '9',
            title: 'Honda SUV', 
            image: '/images/projects/9.png',
            desc: 'Joomla CMS',
            description: 'Thematic Honda site based on Joomla CMS.',
            date: new Date('2011', '05', '01'),
            tags: ['web', 'development'],
            url: 'http://www.hondasuv.ru'
        }
    ]);  

exports.Projects = Projects;

