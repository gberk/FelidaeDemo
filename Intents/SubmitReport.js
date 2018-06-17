const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var SubmitReport = function(Context){
    ConversationLog.log(Context)
    Context.report.isTest = false;
    Context.assistant
        .say(Script.REPORT_SUBMITTED)
        .card({
            "basicCard": {
              "title": "Thank you for your report",
              "subtitle": "",
              "formattedText": "Register your email for follow up",
              "image": {
                "url": "https://storage.googleapis.com/ff-sightingsreport.appspot.com/felida-logo.jpg",
                "accessibilityText": "image attribute"
              },
              "buttons": [
                {
                  "title": "Refresh Labs",
                  "openUrlAction": {
                    "url":  process.env.WEBSITE_BASEURL + "/notification?report="+ Context.report.url 
                  }
                }
              ]
            }
        })
        .finish({"exit": true})

    Context.report.save()
}

module.exports = SubmitReport;