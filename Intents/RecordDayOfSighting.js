const StateProvider = require("../DataStores/StateProvider")
const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')

const stateForTimeFollowUp = "gettingTimeOfSighting"
const stateForLocationFollowUp = "gettingLocation"
const stateForMeridiemFollowUp = "gettingMeridiem"

const Script = require('./script')
const chrono = require('chrono-node')

var RecordDayOfSighting = function(Context){
    ConversationLog.log(Context)
    let parsedDate = Context.args.parsedDate || chrono.parse(Context.rawInput)[0]
    console.log(parsedDate)
    console.log(Context.args)
    StateProvider.getState(Context).then(currentState => {
        switch(currentState){
            case "gettingDayOfSighting": {getDayOfSighting(Context, parsedDate); break;}
            case "gettingTimeOfSighting":{ followUpForTime(Context, parsedDate); break;}
            case "gettingMeridiem": {followUpForMeridiem(Context, parsedDate); break;}
        }
    })
}

/* ////
    Process by currentState
*/ ////
function getDayOfSighting(Context, parsedDate){
    //No match or in future
    let currentYear = (new Date()).getFullYear()
    if(!knownDate(parsedDate) || parsedDate.start.getYear > currentYear)
    {
        UserStore.set(Context, {previousMessage: Script.REQUEST_DATETIME_OF_SIGHTING})
        Context.assistant
            .say("I didn't get that. ")
            .say(Script.REQUEST_DATETIME_OF_SIGHTING)
            .reprompt.say(Script.REQUEST_DATETIME_OF_SIGHTING)
            .finish()
        return;
    }

    UserStore.set(Context, {inProgressSightingTime: parsedDate})    
    //Day + Time Perfect
    ////Follow up state: gettingLocation
    if(knownTime(parsedDate) && knownTimeOfDay(parsedDate))
    {
        recordToDB(Context,parsedDate)
        moveToGettingLocation(Context)
    }
    
    //Day + Time but no Am/PM
    ////Follow up state: gettingMeridiem
    else if(knownTime(parsedDate))
    {
        moveToGettingMeridiem(Context)
    }

    //Day + Am/PM but no time
    //Day only
    else{
        moveToTimeOfSighting(Context)
    }
}

function followUpForTime(Context, parsedDate){
        //No Time
        if(!parsedDate && !Context.args.dateOfSighting)
        {
            UserStore.set(Context, {previousMessage: Script.REPEAT_TIME_OF_SIGHTING})
            Context.assistant
                .say("I didn't get that. ")
                .say(Script.REPEAT_TIME_OF_SIGHTING)
                .reprompt.say(Script.REPEAT_TIME_OF_SIGHTING)
                .finish()
            return;
        }

        //Time Perfect
        if(parsedDate && knownTime(parsedDate))
        {
                let previouslyRecordedTime = UserStore.get(Context).inProgressSightingTime;
                console.log(Context.args, previouslyRecordedTime)
                previouslyRecordedTime.assign('hour', parsedDate.get('hour'))
                previouslyRecordedTime.assign('meridiem', parsedDate.get('meridiem'))
                console.log(previouslyRecordedTime)
                recordToDB(Context, previouslyRecordedTime)
                moveToGettingLocation(Context)
        }
        //Time Imperfect
        else{
            let hourOfSighting = parseInt(Context.args.dateOfSighting.substring(0,2))
            UserStore.get(Context).then(ctx => {
                let previouslyRecordedTime = ctx.inProgressSightingTime;
                console.log(previouslyRecordedTime)
                
                //Existing AM/PM from first pass
                if(impliedTime(previouslyRecordedTime) || previouslyRecordedTime.start.isCertain('meridiem'))
                {
                    previouslyRecordedTime.start.assign('hour', hourOfSighting)
                    let inferredMeridiem = previouslyRecordedTime.start.get('hour') > 12 ? 1 : 0
                    previouslyRecordedTime.start.assign('meridiem', inferredMeridiem) 
                    recordToDB(Context, previouslyRecordedTime)
                    moveToGettingLocation(Context)
                } else {
                    previouslyRecordedTime.start.assign('hour', hourOfSighting)
                    UserStore.set(Context, {inProgressSightingTime: previouslyRecordedTime})
                    moveToGettingMeridiem(Context)
                }
        })
    }
            
}

function followUpForMeridiem(Context)
{
        //No Meridiem
            //Retry
        //Meridem Perfect
        ////Follow up state: gettingLocations
}

function recordToDB(Context, chronoDate)
{
    Context.report.momentOfSighting = chronoDate.start.date
    Context.report.save()
}

function moveToTimeOfSighting(Context)
{
    StateProvider.setState(Context, stateForTimeFollowUp)
    UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING})
    Context.assistant
        .say(Script.REQUEST_TIME_OF_SIGHTING)
        .reprompt.say(Script.REQUEST_TIME_OF_SIGHTING)
        .finish()
}

function moveToGettingMeridiem(Context)
{
    StateProvider.setState(Context, stateForMeridiemFollowUp)
    UserStore.set(Context, {previousMessage: Script.REQUEST_AM_PM})
    Context.assistant
        .say(Script.REQUEST_AM_PM)
        .reprompt.say(Script.REQUEST_AM_PM)
        .finish()
}

function moveToGettingLocation(Context)
{
    StateProvider.setState(Context, stateForLocationFollowUp)
    UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS})
    Context.assistant
        .say("Perfect, thank you. ")
        .pause("500ms")
        .say(Script.REQUEST_ADDRESS)
        .reprompt.say(Script.REQUEST_ADDRESS)
        .finish()
}


/* ////
    Date Helper functions
*/ ////

function knownDate(d){
    d = d.start
    return d.isCertain('day') && d.isCertain('month') && d.isCertain('year')
}

function knownTime(d){
    d = d.start
    return d.isCertain('hour')
}

function knownTimeOfDay(d){
    d = d.start
    return d.isCertain('meridiem')
}

function impliedTime(d){
    d = d.start
    return d.get('hour') && !d.isCertain('hour')
}

module.exports = RecordDayOfSighting

