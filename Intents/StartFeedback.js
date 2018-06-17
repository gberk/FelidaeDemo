const StateProvider = require('../DataStores/StateProvider')
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var StartFeedback = function(Context){
    ConversationLog.log(Context)
    StateProvider.setState(Context, "captureFeedback")
    Context.assistant
        .say(Script.FEEDBACK_REQUEST)
        .reprompt.say(Script.FEEDBACK_REQUEST)
        .setContext('feedback', 1)
        .finish();
}

module.exports = StartFeedback;