var UserStore = require('../DataStores/UserStore')
var ConversationLog = require('../DataStores/ConversationLog')
const states = require('../states')

var Fallback = function(Context){
    return new Promise((resolve, reject) => {
        if(Context.intentName != "Fallback") resolve();

        else {
            UserStore.get(Context)
                .then((data) => {
                    ConversationLog.findById(data.conversationId)
                    
                    Context.assistant
                    .say("Sorry, I didn't get that. ")
                    .say(data.previousMessage)
                    resolve()
                })    
        }
    })
}

module.exports = Fallback