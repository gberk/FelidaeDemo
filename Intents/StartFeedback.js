var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

var StartFeedback = function(Context){
    StateProvider.setState(Context, "captureFeedback")
    Context.assistant
        .say(Script.FEEDBACK_REQUEST)
        .reprompt.say(Script.FEEDBACK_REQUEST)
        .setContext('feedback', 1)
        .finish();
}

module.exports = StartFeedback;