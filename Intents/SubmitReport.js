var Script = require('./script')

var SubmitReport = function(Context){
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
                    "url": "https://www.refreshlabs.co/"
                  }
                }
              ]
            }
        })
        .finish({"exit": true})

    Context.report.save()
}

module.exports = SubmitReport;