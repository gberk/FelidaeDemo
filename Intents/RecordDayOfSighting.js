const StateProvider = require("../DataStores/StateProvider")
const UserStore = require('../DataStores/UserStore')
const ConversationLog = require('../DataStores/ConversationLog')

const stateForTimeFollowUp = "gettingTimeOfSighting"
const stateForLocationFollowUp = "gettingLocation"
const stateForMeridiemFollowUp = "gettingMeridiem"

const Script = require('./script')
const chrono = require('chrono-node')

const dateTimeRegex = /((\d{4})-(\d{2})-(\d{2}))?(T?)((\d{2})\:(\d{2})\:(\d{2}))?(Z?)/

var RecordDayOfSighting = function(Context){
    ConversationLog.log(Context)
    let parsedDate = chrono.parse(Context.rawInput)
    if(parsedDate && parsedDate[0])
    {
        parsedDate= parsedDate[0]
    } 
    else
    {
        parsedDate = null
    }
    StateProvider.getState(Context).then(currentState => {
        switch(currentState){
            case "gettingDayOfSighting": {getDayOfSighting(Context, parsedDate); break;}
            case "gettingTimeOfSighting":{followUpForTime(Context, parsedDate); break;}
        }
    })
}

/* ////
    Process by currentState
*/ ////
function getDayOfSighting(Context, parsedDate){
    //No match
    var dateMatchedString = Context.args.dateOfSighting.match(dateTimeRegex)
    var dateMatch = dateMatchedString[1]
    var timeMatch = dateMatchedString[6]


    if(timeMatch && !Context.args.dateOfSighting.includes('/')){
        if(parsedDate && parsedDate.start && (noon(parsedDate, timeMatch) || midnight(parsedDate, timeMatch)))
        {
            if(noon(parsedDate, timeMatch)) {
                parsedDate = chrono.parse(`today at noon`)[0];
            }
            else if(midnight(parsedDate, timeMatch)) {
                parsedDate = chrono.parse(`today at midnight`)[0]
            }
            recordToDB(Context,parsedDate)
            moveToGettingLocation(Context)
        } else {
            parsedDate = chrono.parse(`today at ${parseInt(timeMatch.substring(0,2))}`)
            UserStore.set(Context, {inProgressSightingTime: parsedDate})
            moveToGettingMeridiem(Context)
        }

        return;
    }


    if(!knownDate(parsedDate))
    {
        if(knownTime(parsedDate) && knownTimeOfDay(parsedDate)){
            let today = new Date()
            parsedDate.start.assign('day', today.getDay())
            parsedDate.start.assign('month', today.getMonth())
            parsedDate.start.assign('year', today.getFullYear())
            recordToDB(Context,parsedDate)
            moveToGettingLocation(Context)
        } else {
            UserStore.set(Context, {previousMessage: Script.REQUEST_DATETIME_OF_SIGHTING})
            Context.assistant
                .say("I didn't get that. ")
                .say(Script.REQUEST_DATETIME_OF_SIGHTING)
                .reprompt.say(Script.REQUEST_DATETIME_OF_SIGHTING)
                .finish()
        }
        return;
    }

    UserStore.set(Context, {inProgressSightingTime: parsedDate})    

    //Day + Time Perfect
    if((knownTime(parsedDate) && knownTimeOfDay(parsedDate)) || (knownTime(parsedDate) && parseInt(timeMatch.substring(0,2)) >= 12))
    {
        recordToDB(Context,parsedDate)
        moveToGettingLocation(Context)
    }
    
    //Day + Time but no Am/PM
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
        var dateMatchedString = Context.args.dateOfSighting.match(dateTimeRegex)
        var dateMatch = dateMatchedString[1]
        var timeMatch = dateMatchedString[6]
        if(noTimeComponent(parsedDate, timeMatch, Context.args.dateOfSighting))
        {
            UserStore.set(Context, {previousMessage: Script.REPEAT_TIME_OF_SIGHTING})
            Context.assistant
                .say("I didn't get that. ")
                .say(Script.REPEAT_TIME_OF_SIGHTING)
                .reprompt.say(Script.REPEAT_TIME_OF_SIGHTING)
                .finish()
            return;
        }
        console.log(parsedDate)
        if(!parsedDate){
            let hourOfSighting = parseInt(Context.args.dateOfSighting.substring(0,2))
            UserStore.get(Context).then(ctx => {
                let previouslyRecordedTime = ctx.inProgressSightingTime;
                console.log('here ')
                //Existing AM/PM from first pass
                if(impliedTime(previouslyRecordedTime) && previouslyRecordedTime.start.get('hour') != 12 || previouslyRecordedTime.start.isCertain('meridiem'))
                {
                    let inferredMeridiem = previouslyRecordedTime.start.get('hour') > 12 ? 1 : 0
                    previouslyRecordedTime.start.assign('meridiem', inferredMeridiem) 
                    if( inferredMeridiem == 1 && hourOfSighting < 12)
                    {
                        hourOfSighting += 12
                    }
                    previouslyRecordedTime.start.assign('hour', hourOfSighting)
                    recordToDB(Context, previouslyRecordedTime)
                    moveToGettingLocation(Context)

                } else {
                    previouslyRecordedTime.start.assign('hour', hourOfSighting)
                    UserStore.set(Context, {inProgressSightingTime: previouslyRecordedTime})
                    moveToGettingMeridiem(Context)
                }
            })
        } else {
            //Time Perfect
            if((parsedDate && knownTime(parsedDate)) || noon(parsedDate,timeMatch) || midnight(parsedDate, timeMatch)) 
            {
                UserStore.get(Context).then(ctx => {
                    let previouslyRecordedTime = ctx.inProgressSightingTime;
                    previouslyRecordedTime.start.assign('hour', parsedDate.start.get('hour'))
                    previouslyRecordedTime.start.assign('meridiem', parsedDate.start.get('meridiem'))
                    recordToDB(Context, previouslyRecordedTime)
                    moveToGettingLocation(Context)
                })
            }
    }
            
}

function recordToDB(Context, chronoDate)
{
    console.log('saving date to database', chronoDate.start.date().toString())
    Context.report.momentOfSighting = chronoDate.start.date()
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

function noon(parsedDate, timeMatch)
{
    return parsedDate.start.get('hour') == 12 && parseInt(timeMatch.substring(0,2)) == 12
}

function midnight(parsedDate, timeMatch)
{
    return parsedDate.start.get('hour') == 0 && parseInt(timeMatch.substring(0,2)) == 0
}

function noTimeComponent(parsedDate, timeMatch, dateOfSighting)
{
    if(timeMatch && !dateOfSighting.includes('/')) return false;
    if(!parsedDate || parsedDate.start.get('hour') == 12 || dateOfSighting.includes('/')) return true;
    return false
}

module.exports = RecordDayOfSighting

