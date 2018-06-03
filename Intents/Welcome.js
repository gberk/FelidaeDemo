var StateProvider = require('../DataStores/StateProvider')
var UserStore = require('../DataStores/UserStore')
var Script = require('./script')
var Welcome = function(Context){
    StateProvider.setState(Context, "gettingPublicSafetyResponse")
    UserStore.set(Context, {previousMessage: Script.WELCOME})
    Context.assistant
        .say(Script.WELCOME)
        .finish()
}

module.exports = Welcome;