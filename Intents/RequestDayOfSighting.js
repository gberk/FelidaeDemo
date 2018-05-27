var StateProvider = require("../DataStores/StateProvider")

var RequestDayOfSighting = function(Context){
    StateProvider.setState(Context,"gettingDayOfSighting")
    Context.assistant
        .say("Can you tell me which day and time you sighted the puma?")
        .finish()
}

module.exports = RequestDayOfSighting