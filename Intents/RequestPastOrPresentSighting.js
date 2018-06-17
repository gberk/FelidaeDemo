const StateProvider = require('../DataStores/StateProvider')
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var RequestPastOrPresentSighting = function(Context){
    ConversationLog.log(Context)
    StateProvider.setState(Context, "gettingPresentSighting")
    UserStore.set(Context, {previousMessage: Script.CURRENT_SIGHTING})

    Context.assistant
        .say("I'm glad you're safe. ")
        .say(Script.CURRENT_SIGHTING)
        .reprompt.say(Script.CURRENT_SIGHTING)
        .finish()
}

module.exports = RequestPastOrPresentSighting;