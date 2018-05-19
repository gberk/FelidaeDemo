var StateProvider = require('../DataStores/StateProvider')

var RequestPastOrPresentSighting = function(Context){
    StateProvider.setState(Context, "gettingPresentSighting")
    Context.assistant
        .say("Good to hear you are safe. Did this sighting just occur?")
        .finish()
}

module.exports = RequestPastOrPresentSighting;