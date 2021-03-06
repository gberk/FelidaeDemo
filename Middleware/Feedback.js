const StateManager = require('../DataStores/StateProvider')

var Feedback = function(Context){
    return new Promise((resolve, reject) => {
        StateManager.getState(Context).then((currentState) => {
            console.log(currentState)
            if(currentState != "captureFeedback") resolve();

            else {
                if ( Context.intentName != "Welcome") {
                    Context.intentName = "CaptureFeedback"
                }
                resolve()
            }
        })
    })
}

module.exports = Feedback