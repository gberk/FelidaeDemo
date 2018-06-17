const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')

var EnableProd = function(Context){
    ConversationLog.log(Context)
    UserStore.get(Context).then((data) => {
        Context.assistant
            .say("Production mode enabled. ")
            .say(data.previousMessage)
            .finish()
        resolve()
    })   
}

module.exports = EnableProd;