var StateProvider = require("../DataStores/StateProvider")
var RequestDayOfSighting = function(Context){

    StateProvider.setState(Context,"gettingDayOfSighting")
    Context.assistant
        .say("Ok, what day did this sighting occur?")
        .finish()
}

module.exports = RequestDayOfSighting