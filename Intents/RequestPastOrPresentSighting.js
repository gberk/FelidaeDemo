var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')
var RequestPastOrPresentSighting = function(Context){
    StateProvider.setState(Context, "gettingPresentSighting")
    UserStore.set(Context, {previousMessage: Script.CURRENT_SIGHTING})
    Context.assistant
        .say("I'm glad you're safe. ")
        .say(Script.CURRENT_SIGHTING)
        .finish()
}

module.exports = RequestPastOrPresentSighting;