var StateProvider = require('../DataStores/StateProvider');

var RequestPastOrPresentSighting = function(Context){
    StateProvider.setState(Context, "gettingPresentSighting")
    Context.assistant
        .say("Did this sighting occur just now?")
        .finish()
}

module.exports = RequestPastOrPresentSighting;