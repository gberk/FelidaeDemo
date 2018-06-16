var AskForLocation = function(Context)
{
    StateProvider.setState(Context, "gettingLocation")
    UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS})
    Context.assistant
        .say(Script.REQUEST_ADDRESS)
        .reprompt.say(Script.REQUEST_ADDRESS)
        .finish()
}