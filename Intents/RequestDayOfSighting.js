var StateProvider = require("../DataStores/StateProvider")

var RequestDayOfSighting = function(Context){
    StateProvider.setState(Context,"gettingDayOfSighting")
    UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
    Context.assistant
        .say(REQUEST_DATETIME_OF_SIGHTING)
        .finish()
}

module.exports = RequestDayOfSighting