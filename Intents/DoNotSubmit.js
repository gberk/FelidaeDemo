var Script = require('./script')

var DoNotSubmit = function(Context){
    Context.assistant
        .say(Script.REPORT_NOT_SUBMITTED)
        .finish({"exit": true})
}

module.exports = DoNotSubmit