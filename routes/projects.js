
var getDate = function (dateval) {
                var d = new Date(parseInt(dateval)); 
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();
                
                return curr_date + "/" + curr_month + "/" + curr_year;;
            }

var mergeObj = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var parseArticle = function (body) {
    //var body = body.replace(/\n/g, '<br />'); 
    var body = '<p>'+body.replace(/[\r\n]+(?=[^\r\n])/g,'</p><p>')+'</p>';
    return body;
}

var Projects = require('../models/projects').Projects;

exports.index = function(req, res){
     
    Projects.getAll( function(projects) {
        res.render('projects', { 
            title: 'Projects' 
            , projects: projects
        });
    });
}

exports.single = function(req, res){
    var id = req.param('id');
    Projects.getSingleById( id, function(err, project) {
        res.render('projectSingle', { 
            title: project.title 
            , project: project
        });
    });
}



