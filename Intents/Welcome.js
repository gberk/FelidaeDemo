var StateProvider = require('../DataStores/StateProvider')

var Welcome = function(Context){
    StateProvider.setState(Context, "gettingPublicSafetyResponse")

    Context.assistant
        .say("Welcome to Felidae Fund's puma sightings report tool. Is this concerning immediate public safety?")
        .finish()
}

module.exports = Welcome;