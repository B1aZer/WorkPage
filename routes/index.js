
var nodemailer = require("nodemailer")
    , config = require("../config");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: config.email.name,
        pass: config.email.pass
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "WorkPage Admin <kwerkee12@gmail.com>", // sender address
    to: "blaze.imba@gmail.com", // list of receivers
    subject: "Message to You", // Subject line
    text: "Hello world", // plaintext body
    html: "<b>Hello world </b>" // html body
}

/*
 * GET home page.
 */
exports.index = function(req, res){
    if ( req.user && !req.session.user ) {
        req.session.user = req.user;
        res.locals.user = req.user;
    }
    res.render('index', { title: config.title });
};

exports.sendMessage = function(req, res){
    var text = req.param('text');
    mailOptions.text = text;
    mailOptions.html = text;

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
    res.send({status:'ok'});
}


exports.test = function(req, res){
    res.render('test', { title: 'test' });
};

exports.yandex = function(req, res){
    res.render('yandex', { title: 'yandex' });
};
