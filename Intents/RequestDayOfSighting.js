var StateProvider = require("../DataStores/StateProvider")
var Script = require('./script')
var ConversationLog = require('../DataStores/ConversationLog')

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