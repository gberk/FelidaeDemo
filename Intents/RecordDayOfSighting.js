var StateProvider = require("../DataStores/StateProvider")

const stateForTimeFollowUp = "gettingTimeOfSighting"
const stateForLocationFollowUp = "gettingLocation"
var Script = require('./script')
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
                .say("I didn't get that. ")
                .say(REPEAT_TIME_OF_SIGHTING)
                .reprompt.say(REPEAT_TIME_OF_SIGHTING)
                .finish()
            } else {
                StateProvider.setState(Context, stateForLocationFollowUp)
                UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS})
                Context.report.timeOfSighting = timeMatch;
                Context.report.save()
                Context.assistant
                    .say(Script.REQUEST_ADDRESS)
                    .reprompt.say(Script.REQUEST_ADDRESS)
                    .finish()
            }
        } else {
            //DETERMINE NEXT STATE
            //CASE: No date or time provided
            if(!Context.args.dateOfSighting || (!dateMatch && !timeMatch))
            {
                UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
                Context.assistant
                    .say("I didn't get that. ")
                    .say(Script.REPEAT_TIME_OF_SIGHTING)
                    .reprompt.say(Script.REQUEST_TIME_OF_SIGHTING)
                    .finish()
            }
    
            //CASE: Date only
            else if(dateMatch && !timeMatch)
            {
                StateProvider.setState(Context, stateForTimeFollowUp)
                UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
                Context.report.dateOfSighting = dateMatch;
                Context.report.save();
                Context.assistant
                    .say("Thanks. ")
                    .say(Script.REQUEST_TIME_OF_SIGHTING)
                    .reprompt.say(Script.REQUEST_TIME_OF_SIGHTING) 
                    .finish()
            }
    
            //CASE: Date and Time
            else //Is this enough?
            {
                StateProvider.setState(Context, stateForLocationFollowUp)
                Context.report.dateOfSighting = dateMatch;
                Context.report.timeOfSighting = timeMatch;
                Context.report.save()
                UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS })

                Context.assistant
                    .say("Got it. ")
                    .say(Script.REQUEST_ADDRESS)
                    .reprompt.say(Script.REQUEST_ADDRESS) 
                    .finish()
            }
        }
    })
    //If we're coming back through to get the time
    


}

module.exports = RecordDayOfSighting

