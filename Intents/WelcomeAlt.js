var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')
var WelcomeAlt = function(Context){
    StateProvider.setState(Context, "gettingPublicSafetyResponse")
    UserStore.set(Context, {previousMessage: Script.WELCOME})

    Context.assistant
        .say(Script.WELCOME)
        .finish()
}

module.exports = WelcomeAlt;