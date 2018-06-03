var StateManager = require('../DataStores/StateProvider')

const states = require('../states')

var SkipMiddleware = function(Context){
    return new Promise((resolve, reject) => {
        if(Context.intentName != "IDK") resolve();

        else {
            StateManager.getState(Context)
                .then((state) => {
                    Context.assistant.say("Ok. ").pause('300ms')
                    Context.intentName = states[state].skipTo
                    resolve()
                })    
        }
    })
}

module.exports = SkipMiddleware