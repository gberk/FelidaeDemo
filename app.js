var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
require('dotenv').config()

app.use(express.static('public'))

var IntentMap = require('./Intents')
var States = require('./states')
var Errors = require('./Errors')
var StateProvider = require('./DataStores/StateProvider')
var Middleware = require('./Middleware')

//Set up db connection
var mongoose = require('mongoose')
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, (err) => {if (err) console.log("Mongoose error: " + err)});

var Ayva = require('ayva')

//Ayva Config
Ayva.Config.RegisterIntents(IntentMap);
Ayva.Config.RegisterStates(States);
Ayva.Config.RegisterErrors(Errors);
Ayva.Config.RegisterMiddleware(Middleware);
Ayva.Config.StateProvider(StateProvider); //Change this for applications with non-trivial state

app.post('/gAssistant', function(req, res) {
    Ayva.ExecuteRequest.FromGoogle(req.body, res);    
})

app.post('/alexa', function(req, res) {
    Ayva.ExecuteRequest.FromAlexa(req.body, res);    
})

app.get('/privacyPolicy', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/privacyPolicy.html'))
})

app.get('/notification', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notification.html'))
})

app.get('/feedback', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/feedback.html'))
})

app.get('/notFound', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notFound.html'))
})

app.post('/sendEmail', function (req, res) {
    let email = req.body.emailAddress
    let sendGridAuth = "Bearer " + process.env.SENDGRID_API_KEY
    let sendGridRequest = {
        "personalizations": [{
            "to": [{
                "email": email
            }],
            "subject": "Hello, World!"
        }],
        "from": {
            "email": "founders@example.com"
        },
        "content": [{
            "type": "text/plain",
            "value": "Hello, World!"
        }]
    }

    // save email address to db

    // send email to felidae team
    axios({
        method:'post',
        headers: {
            Authorization: sendGridAuth
        },
        url: 'https://api.sendgrid.com/v3/mail/send',
        data: sendGridRequest
    }).then((response) => {
        let result = {
            status: response.status,
            statusText: response.statusText
        }
        res.send(result)
    }).catch((error) => {
        res.send(error)
    })
})

app.post('/webformFeedback', function(req, res) {
    let feedback = req.body.feedback;
    axios({
        method: 'post',
        headers:{"Content-type":"application/json"},
        data: {text: feedback},
        url: process.env.FEEDBACK_RIVER_WEBFORM
    }).then((response) => {
        console.log("Feedback sent to Slack successfully.")
        let result = {
            status: response.status,
            statusText: response.statusText
        }
        res.send(result)
    }).catch((error) => {
        console.log("Feedback error: " + error)
        res.send(error)
    })
})

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});