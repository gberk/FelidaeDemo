var StateProvider = require('../DataStores/StateProvider')
var UserStore = require('../DataStores/UserStore')
var ConversationLog = require('../DataStores/ConversationLog')
var Script = require('./script')
var Report = require('../DataStores/Reports')

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