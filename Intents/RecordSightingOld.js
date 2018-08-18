var RecordDayOfSighting = function(Context){
    ConversationLog.log(Context)
    let parsedDate = Context.args.parsedDate || chrono.parse(Context.rawInput)[0]

    Context.assistant.say("Ok").finish()
    StateProvider.getState(Context).then(userState => {
        if(userState == stateForTimeFollowUp)
        {
            //We're currently ignoring the case where someone specifies a date first, and then a date and time as a follow up
            if(!knownTime(parsedDate))
            {
                Context.assistant
                .say("I didn't get that. ")
                .say(REPEAT_TIME_OF_SIGHTING)
                .reprompt.say(REPEAT_TIME_OF_SIGHTING)
                .finish()
            } else {
                
                Context.report.timeOfSighting = timeMatch;
                Context.report.save()

            }
        } else {
            //DETERMINE NEXT STATE
            //CASE: No date or time provided
            if(!parsedDate || (!knownDate(parsedDate) && !knownTime(parsedDate)))
            {
                UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
                Context.assistant
                    .say("I didn't get that. ")
                    .say(Script.REPEAT_TIME_OF_SIGHTING)
                    .reprompt.say(Script.REQUEST_TIME_OF_SIGHTING)
                    .finish()
            }

            //CASE: Date with vague or missing time -> ask for time and remember if they said am/pm
            else if(knownDate(parsedDate) && !knownTime(parsedDate))
            { 
                StateProvider.setState(Context, stateForTimeFollowUp)
                UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
                Context.report.dateOfSighting = dateMatch;
                Context.report.save();
                Context.assistant
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
                    .say(Script.REQUEST_ADDRESS)
                    .reprompt.say(Script.REQUEST_ADDRESS) 
                    .finish()
            }
        }
    })
}