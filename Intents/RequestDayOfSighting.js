var StateProvider = require("../DataStores/StateProvider")
var Script = require('./script')
var RequestDayOfSighting = function(Context){
    StateProvider.setState(Context,"gettingDayOfSighting")
    UserStore.set(Context, {previousMessage: Script.REQUEST_DATETIME_OF_SIGHTING})
    Context.assistant
        .say(Script.REQUEST_DATETIME_OF_SIGHTING)
        .reprompt.say(Script.REQUEST_DATETIME_OF_SIGHTING)
        .finish()
}

module.exports = RequestDayOfSighting