const StateProvider = require("../DataStores/StateProvider")
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var RequestDayOfSighting = function(Context){
    ConversationLog.log(Context)
    StateProvider.setState(Context,"gettingDayOfSighting")
    UserStore.set(Context, {previousMessage: Script.REQUEST_DATETIME_OF_SIGHTING})

    Context.assistant
        .say(Script.REQUEST_DATETIME_OF_SIGHTING)
        .reprompt.say(Script.REQUEST_DATETIME_OF_SIGHTING)
        .finish()
}

module.exports = RequestDayOfSighting