var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'hbs');
require('dotenv').config()

app.use(express.static('views'))

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
    res.sendFile(path.join(__dirname + '/views/privacyPolicy.html'))
})

app.get('/notification/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/notification.html'))
})

app.get('/feedback', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/feedback.html'))
})

app.get('/reports', function(req, res) {
    Reports.find({isTest:false}).sort({createdAt: 'descending'})
        .then((reports) => {
            var reportsListView = reports.map( (r => {
                return {
                    url: "/report/"+ r._id,
                    dateReported: formatDate(r.createdAt)
                }
            }))
            res.render('reportList', {reports:reportsListView})
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get('/report/:id', function(req, res) {
    Reports.findById(req.params.id)
        .then((r) => {
            let reportView={};
            reportView.dateReported = formatDate(r.createdAt)
            reportView.locationOfSighting = formatAddress(JSON.parse(r.addressOfSighting || r.latlonOfSighting))
            reportView.timeOfSighting = r.dateOfSighting ? (`${r.dateOfSighting} @ ${r.timeOfSighting || '(no time provided)'}`) : formatDate(r.createdAt)
            res.render('report', {report:reportView})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})

app.get('/fallbackReport', function(req,res){
    let fallbackReport = require('./Reports/fallbackReport')
        
    fallbackReport.run()
        .then(fallbackReportData => res.render('fallbackReport', {reports:fallbackReportData}))
        .catch((err) => {console.log(err); res.send(err)})
})

function formatDate(date){
    return (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear() + ' @ ' + padTime(date.getHours()) + ':' + padTime(date.getMinutes())
}

function padTime(time){
    if(time < 10)
        return "0" + time
    else return time

}

function formatAddress(address,acc){
    if(!acc) acc = ""
    Object.keys(address).map(key => {
        if(typeof(address[key]) === "object")
            acc = formatAddress(address[key], acc)
        else if (address[key] && address[key] != "")
            acc += `${key} : ${address[key]} <br>`
    })
    return acc
}

app.get('/notFound', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notFound.html'))
})

var Reports = require('./DataStores/Reports')

var recordEmailForReport = function(reportId, email){
    return new Promise((resolve, reject) => {
        resolve()
        Reports.find({url:reportId})
            .then((report) => {

                if(!report[0])
                {
                    reject ("Report not found")
                }
                else if(report[0].email && report[0].email.length() > 0) 
                {
                    reject("An email address has already been submitted for that report")
                }
                else{
                    report[0].email = email;
                    report[0].url = null;
                    report[0].save()
                    resolve(report[0])
                }
            })
            .catch((err) => {
                reject (err)
            })
    })
   
}

const SendEmail = require('./Email/sendEmail')

app.post('/submitEmail', function (req, res) {
    let email = req.body.emailAddress
    let reportId = req.body.reportId
        // save email address to db
        recordEmailForReport(reportId, email)
        .then((report) => {
            SendEmail(email).then((result) => {
                res.send(result);
            })
        })
        .catch((err) => {
            res.send(err)
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