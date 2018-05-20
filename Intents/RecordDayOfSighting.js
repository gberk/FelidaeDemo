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
    console.log(Context.args.dateOfSighting)
    console.log(dateMatch)
    console.log(timeMatch)

    //DATE PREPROCESSING
    //Is the date in the future? Rewind to this year
    // if(dateMatch && (new Date(dateMatch) > Date.now()))
    // {}
    //Is there just a time? Assume today.
    

    //DETERMINE NEXT STATE
    //CASE: No date or time provided
    if(!Context.args.dateOfSighting || (!dateMatch && !timeMatch))
    {
        Context.assistant
            .say("I didn't get that. When did this sighting occur? If you don't remember, you can just say I don't remember")
            .finish()
    }

    //CASE: Date only
    else if(dateMatch && !timeMatch)
    {
        StateProvider.setState(Context, stateForTimeFollowUp)
        Context.assistant
            .say("Thanks. What time did this sighting occur?")
            .finish()
    }

    //CASE: Date and Time
    else //Is this enough?
    {
        StateProvider.setState(Context, stateForLocationFollowUp)
        Context.assistant
            .say("Got it. Can you tell me the the name of the nearest landmark " 
            + "or nearest address to where you saw the puma?")
            .finish()
    }

}

module.exports = RecordDayOfSighting

