var StateProvider = require('../DataStores/StateProvider')
var StateConfig = require('../states')
var RespondToYesNo = function(Context) {
    return new Promise((resolve, reject) => {
        StateProvider.getState(Context).then(currentState => {
            if(Context.intentName == "Affirmative")
                Context.intentName=  StateConfig[currentState].affirmative
            if(Context.intentName == "Negative")
                Context.intentName = StateConfig[currentState].negative
            resolve()
        })
    })
}

module.exports = RespondToYesNo
