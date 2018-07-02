const StateProvider = require('../DataStores/StateProvider')
const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')
const Script = require('./script')
const Report = require('../DataStores/Reports')

var Welcome = function(Context){
    StateProvider.setState(Context, "gettingPublicSafetyResponse")
    var report = new Report({reportedByUser: Context.deviceProfile.id})    
    report.save()
    var conversationLog = new ConversationLog()
    conversationLog.save()
        .then(() => 
        {
            UserStore.reset(Context)
            UserStore.set(Context, {previousMessage: Script.WELCOME, reportId: report.id, conversationId: conversationLog.id })
            ConversationLog.log(Context)
        })
    
    Context.assistant
        .say("Hi, I’m an assistant with Felidae Fund.")
        .pause("250ms")
        .say("If you've encountered a wild cat, I'll help you report the sighting")
        .pause("50ms").say("to assist with our conservation efforts.")
        .pause("300ms")
        .say("First,").pause("100ms").say("tell me,")
        .pause("400ms")
        .say(Script.WELCOME)
        .reprompt.say(Script.WELCOME)
        .finish()
}

module.exports = Welcome;