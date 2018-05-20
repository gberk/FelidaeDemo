var StateProvider = require("../DataStores/StateProvider")

var RecordTimeOfSighting = function(Context){

    StateProvider.setState(Context, 'gettingLocation')
    Context.assistant
        .say("Got it. Can you tell me the the name of the nearest landmark " 
        + "or nearest address to where you saw the puma?")
        .finish()

}

module.exports = RecordTimeOfSighting

