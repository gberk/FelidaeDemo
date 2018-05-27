var StateProvider = require('../DataStores/StateProvider')

var RequestLocation = function(Context){
    // if not mobile OR in the past
    // Move to state gettingVoiceLocation
    // OR recording for past
    if(!Context.deviceProfile.isMobile())  {
        StateProvider.setState(Context, "gettingLocation")
        Context.assistant
            .say("Can you tell me the the name of the " 
            + "nearest address to where you sighted the puma?" 
        )
            .finish()
    } else {
        //Ask to grab location
        //Move state to gettingGPSLocation
        StateProvider.setState(Context, "gettingGPSLocation")
        Context.assistant
            .location()
            .finish()    
    }
}

module.exports = RequestLocation