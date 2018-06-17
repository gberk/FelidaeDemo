const StateProvider = require('../DataStores/StateProvider')
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')

var RequestLocation = function(Context){
    // if not mobile OR in the past
    // Move to state gettingVoiceLocation
    // OR recording for past
    ConversationLog.log(Context)
    if(!Context.deviceProfile.isMobile())  {
        if(!Context.report.dateOfSighting && !Context.report.timeOfSighting)
        StateProvider.setState(Context, "gettingLocation")
        UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS})
        Context.assistant
            .say(Script.REQUEST_ADDRESS)
            .reprompt.say(Script.REQUEST_ADDRESS)
            .finish()
    } else {
        //Ask to grab location
        //Move state to gettingGPSLocation
        StateProvider.setState(Context, "gettingGPSLocation")
        UserStore.set(Context, {previousMessage: Script.REQUEST_LOCATION_PERMISSION})
        Context.assistant
            .location(Script.REQUEST_LOCATION_PERMISSION)
            .finish()    
    }
}

module.exports = RequestLocation