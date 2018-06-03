// Ayva State manager
var StateManager = require('../DataStores/StateProvider')

var InactiveIntentErrorHandler = function(Context){
    console.log("Intent matched: " + Context.intentName)
    StateManager.getState(Context).then(function(state) {
        Context.assistant.say("This command is currently not available.").finish()
    })
}

module.exports = {
    "InactiveIntentError": InactiveIntentErrorHandler,
}

