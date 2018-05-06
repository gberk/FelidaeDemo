var StateProvider = require('../DataStores/StateProvider')
const followUpState = "gettingPublicSafetyResponse";

var Welcome = function(Context){
    StateProvider.setState(Context, followUpState)

    Context.assistant
        .say("Is this concerning immediate public safety?")
        .finish()
}

module.exports = Welcome;