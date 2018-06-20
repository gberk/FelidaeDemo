var UserStore = require('../DataStores/UserStore')
var ConversationLog = require('../DataStores/ConversationLog')
const states = require('../states')

var Fallback = function(Context){
    return new Promise((resolve, reject) => {
        if(Context.intentName != "Fallback") resolve();

        else {
            ConversationLog.log(Context)
            UserStore.get(Context)
                .then((data) => {

                    
                    Context.assistant
                    .say("Sorry, I didn't get that. ")
                    .say(data.previousMessage)
                    resolve()
                })    
        }
    })
}

module.exports = Fallback