var StateProvider = require("../DataStores/StateProvider")

const stateForTimeFollowUp = "gettingTimeOfSighting"
const stateForLocationFollowUp = "gettingLocation"

//Adapted from: https://stackoverflow.com/questions/12756159/regex-and-iso8601-formatted-datetime
const dateTimeRegex = /((\d{4})-(\d{2})-(\d{2}))?(T?)((\d{2})\:(\d{2})\:(\d{2}))?(Z?)/

var RecordDayOfSighting = function(Context){
    //This stuff is probably worth putting some log statements around for user testing
    var dateMatchedString = Context.args.dateOfSighting.match(dateTimeRegex)
    var dateMatch = dateMatchedString[1]
    var timeMatch = dateMatchedString[6]
    console.log(dateMatch, timeMatch)

    //DATE PREPROCESSING
    //Is the date in the future? Rewind to this year
    // if(dateMatch && (new Date(dateMatch) > Date.now()))
    // {}
    //Is there just a time? Assume today.
    
    StateProvider.getState(Context).then(userState => {
        if(userState == stateForTimeFollowUp)
        {
            //We're currently ignoring the case where someone specifies a date first, and then a date and time as a follow up
            if(!timeMatch)
            {
                Context.assistant
                .say("I didn't get that. Around what time of day did you sight the puma? " +
                     "If you don't remember, you can say I don't remember")
                .finish()
            } else {
                StateProvider.setState(Context, stateForLocationFollowUp)
                Context.assistant
                    .say("Got it. Can you tell me an address " 
                    + "nearest to where you saw the puma?")
                    .finish()
            }
        } else {
            //DETERMINE NEXT STATE
            //CASE: No date or time provided
            if(!Context.args.dateOfSighting || (!dateMatch && !timeMatch))
            {
                Context.assistant
                    .say("I didn't get that. Around what time did you sight the puma? " +
                         "If you don't remember, you can just say I don't remember")
                    .finish()
            }
    
            //CASE: Date only
            else if(dateMatch && !timeMatch)
            {
                StateProvider.setState(Context, stateForTimeFollowUp)
                Context.assistant
                    .say("Thanks. Around what time of day did you sight the puma?")
                    .finish()
            }
    
            //CASE: Date and Time
            else //Is this enough?
            {
                StateProvider.setState(Context, stateForLocationFollowUp)
                Context.assistant
                    .say("Got it. Can you tell me an address " 
                    + "nearest to where you saw the puma?")
                    .finish()
            }
        }
    })
    //If we're coming back through to get the time
    


}

module.exports = RecordDayOfSighting

