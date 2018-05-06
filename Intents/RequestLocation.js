var StateProvider = require('../DataStores/StateProvider')

var RequestLocation = function(Context){
    //if not mobile OR in the past
    ////Move to state gettingVoiceLocation
    if(!Context.deviceProfile.isMobile()) //OR recording for past
    {
        StateProvider.setState(Context, "gettingVoiceLocation")
        Context.assistant
            .say("Can you tell me the nearest street adress, or the closest landmark, along with your city and state?")
            .finish()
    }
    else
    {
        //Ask to grab location
        //Move state to gettingGPSLocation
        StateProvider.setState(Context, "gettingGPSLocation")
        Context.assistant
            .location()
            .finish()    
    }
}

module.exports = RequestLocation