const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')
const StateProvider = require("../DataStores/StateProvider")
const states = require('../states')

var Fallback = function(Context){
    return new Promise((resolve, reject) => {
        if(Context.intentName != "Fallback") resolve();

        else {
            StateProvider.get(Context).then(state => {
               // if(state == "gettingMeridiem") Context.assistant.setContext('timeOfDay')

                ConversationLog.log(Context)
                UserStore.get(Context)
                    .then((data) => {
    
                        
                        Context.assistant
                        .say("Sorry, I didn't get that. ")
                        .say(data.previousMessage)
                        resolve()
                    })    
            })
            
        }
    })
}

module.exports = Fallback