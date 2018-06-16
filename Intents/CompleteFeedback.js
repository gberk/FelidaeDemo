var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

var CompleteFeedback = function(Context){
    StateProvider.setState(Context, "default")
    Context.assistant
        .say("Thank you. Your feedback has been sent to the Refresh Lab product team.")
        .finish({"exit":true});
}

module.exports = CompleteFeedback;