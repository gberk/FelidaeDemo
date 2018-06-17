const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')

var EnableTest = function(Context){
    ConversationLog.log(Context)
    UserStore.get(Context).then((data) => {
        Context.assistant
            .say("Test mode enabled. ")
            .say(data.previousMessage)
            .finish()
        resolve()
    })   
}

module.exports = EnableTest;