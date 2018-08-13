const StateProvider = require("../DataStores/StateProvider")
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var RequestDeadOrAlive = function(Context){
    ConversationLog.log(Context)
    StateProvider.setState(Context,"gettingPumaAliveOrDead")
    UserStore.set(Context, {previousMessage: Script.DEAD_OR_ALIVE})

    Context.assistant
        .say(Script.DEAD_OR_ALIVE)
        .reprompt.say(Script.DEAD_OR_ALIVE)
        .finish()
}

module.exports = RequestDeadOrAlive 