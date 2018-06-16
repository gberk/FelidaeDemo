var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

var StartFeedback = function(Context){
    StateProvider.setState(Context, "captureFeedback")
    Context.assistant
        .say("Do you have suggestions, questions, or experienced a bug? Please leave us a note.")
        .setContext('feedback', 1)
        .finish();
}

module.exports = StartFeedback;