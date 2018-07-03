const Script = require('./script')
const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')

var DoNotSubmit = function(Context){
    ConversationLog.log(Context)
    UserStore.set(Context, {previousMessage: Script.REQUEST_FEEDBACK})
    StateProvider.setState(Context, "requestingFeedback")
    Context.assistant
    .say(Script.REPORT_NOT_SUBMITTED)
    .pause("1s").say("Before you go, ").pause("600ms")
    .say(Script.REQUEST_FEEDBACK)
    .setContext("feedback", 10)
    .finish()

}

module.exports = DoNotSubmit