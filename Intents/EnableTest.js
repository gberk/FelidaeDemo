var UserStore = require('../DataStores/UserStore')
var Script = require('./script')
var EnableTest = function(Context){
    UserStore.get(Context).then((data) => {
        Context.assistant
            .say("Test mode enabled. ")
            .say(data.previousMessage)
            .finish()
        resolve()
    })   
}

module.exports = EnableTest;