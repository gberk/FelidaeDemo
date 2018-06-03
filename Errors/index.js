// Ayva State manager
var UserStore = require('../DataStores/UserStore')

var InactiveIntentErrorHandler = function(Context){
    console.log("Intent matched: " + Context.intentName)
    UserStore.get(Context).then(function(data) {
        Context.assistant
        .say("Sorry, I didn't get that. ")
        .pause('400ms')
        .say(data.previousMessage)
        .finish()
    })
}

module.exports = {
    "InactiveIntentError": InactiveIntentErrorHandler,
}