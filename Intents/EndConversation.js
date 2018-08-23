var EndConversation = function(Context){
    Context.assistant.say(" ").finish({"exit": true})
}

module.exports = EndConversation