const Script = require('./script')

const ConversationLog = require('../DataStores/ConversationLog')

var DoNotSubmit = function(Context){
    ConversationLog.log(Context)
    Context.assistant
        .say(Script.REPORT_NOT_SUBMITTED)
        .finish({"exit": true})
}

module.exports = DoNotSubmit