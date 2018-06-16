var Script = require('./script')

var SubmitReport = function(Context){
    Context.report.isTest = false;

    Context.assistant
        .say(Script.REPORT_SUBMITTED)
        .finish({"exit": true})

    Context.report.save()
}

module.exports = SubmitReport;