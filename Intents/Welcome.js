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
        .say("Welcome to Felidae Fund's puma sightings report tool. ")
        .say(Script.WELCOME)
        .reprompt.say(Script.WELCOME)
        .finish()
}

module.exports = Welcome;