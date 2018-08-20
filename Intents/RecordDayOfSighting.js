var StateProvider = require("../DataStores/StateProvider")
const stateForTimeFollowUp = "gettingTimeOfSighting"
const stateForLocationFollowUp = "gettingLocation"
const stateForMeridiemFollowUp = "gettingMeridiem"
const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')
const chrono = require('chrono-node') //Test before updating this component

//Adapted from: https://stackoverflow.com/questions/12756159/regex-and-iso8601-formatted-datetime
const dateTimeRegex = /((\d{4})-(\d{2})-(\d{2}))?(T?)((\d{2})\:(\d{2})\:(\d{2}))?(Z?)/

//https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
var formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

var RecordDayOfSighting = function(Context){
    console.log("args: " + JSON.stringify(Context.args))
    //This stuff is probably worth putting some log statements around for user testing
    ConversationLog.log(Context)
    var dateMatchedString = Context.args.dateOfSighting.match(dateTimeRegex)
    var dateMatch = dateMatchedString[1]
    var timeMatch = dateMatchedString[6]
    let chronoDate = chrono.parse(Context.rawInput) //Used to help clarify

    console.log(dateMatch, timeMatch)
    var amPM;
    var timeIsCertain = false;
    if(chronoDate[0]) {
        console.log(chronoDate[0].start)
        amPM = inferAmPm(timeMatch, chronoDate[0].start)
        timeIsCertain = certainTime(chronoDate[0].start)
        console.log(`Time is certain: ${timeIsCertain}`)
        console.log(`Inferred meridiem: ${amPM}`)
    }
    

    StateProvider.getState(Context).then(userState => {
        if(userState == stateForTimeFollowUp)
        {
            timeFollowUp(Context, dateMatch, timeMatch, amPM)
        } else {
            extractTimeAndDate(Context, dateMatch, timeMatch, amPM, timeIsCertain)
        }
    })
}

function certainTime(chronoDate){
    return chronoDate.isCertain("hour")
}

function inferAmPm(slotTime, chronoDate)
{
    var slotHour = parseInt(slotTime.substring(0,2))
    if(!chronoDate){
        // console.log("I1")
        return null;
    } 
    var cHour = chronoDate.get("hour")
    if(chronoDate.isCertain('meridiem')){
        // console.log("I2")
        return (chronoDate.get('meridiem')==0 ? "am" : "pm") //Explicit AM/PM from user
    } 
    if(slotHour > 12 || (cHour >= 12 && slotHour >=12))
    {
        // console.log("I3")
        return "pm"//Inferred PM
    }
    if(cHour < 12 && slotHour <12 )
    {
        // console.log("I4")
        return null;  //We cannot be confident about AM here; we might have yesterday at 3, or we might have yesterday at 3 in the morning
    }
    console.log("Why are you here?")
    return null; 
}


function extractTimeAndDate(Context, dateMatch, timeMatch, amPM, timeIsCertain)
{
    //Preprocess date if in future (assuming date is correct in year past)
    if(dateMatch)
    {
        let parsedDate = new Date(dateMatch)
        var now = new Date()
        if(parsedDate > now)
        {
            var yearsInFuture = parsedDate.getFullYear() - now.getFullYear();
            if (yearsInFuture == 1 || yearsInFuture == 0){
                var occuringYear = parsedDate.getFullYear() - 1
                dateMatch = occuringYear + dateMatch.slice(4)
            }
        }
    }
    
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
        followUpForTime(Context, dateMatch, timeMatch, amPM)
    }

    //CASE: Date and Time
    else 
    {
        if(amPM)
        {
            if(timeIsCertain){
                followUpForLocation(Context, dateMatch, timeMatch, amPM)
            } else {
                followUpForTime(Context,dateMatch ,timeMatch, amPM)
            }
        } else {
            if(timeIsCertain)
            {
                followUpForMeridiem(Context, dateMatch, timeMatch)
            } else {
                followUpForTime(Context, dateMatch, timeMatch)
            }
        }
    }
}

function followUpForTime(Context, dateMatch, timeMatch, amPM)
{
    StateProvider.setState(Context, stateForTimeFollowUp)
    UserStore.set(Context, {previousMessage: Script.REQUEST_TIME_OF_SIGHTING, inProgressDate:{dateMatch, amPM}})
    Context.assistant
        .say(Script.REQUEST_TIME_OF_SIGHTING)
        .reprompt.say(Script.REQUEST_TIME_OF_SIGHTING) 
        .finish()
}

function followUpForMeridiem(Context, dateMatch, timeMatch, amPM)
{
    StateProvider.setState(Context, stateForMeridiemFollowUp)
    UserStore.set(Context, {previousMessage: Script.REQUEST_AMPM ,inProgressDate: {dateMatch, timeMatch}})
    Context.assistant
        .say(Script.REQUEST_AMPM)
        .reprompt.say(Script.REQUEST_AMPM)
        .finish()
}

function followUpForLocation(Context, dateMatch, timeMatch, amPM)
{
    StateProvider.setState(Context, stateForLocationFollowUp)

    Context.report.dateOfSighting = dateMatch;
    Context.report.timeOfSighting = updateTimeForAmPM(timeMatch, amPM);
    Context.report.save()

    UserStore.set(Context, {previousMessage: Script.REQUEST_ADDRESS})

    Context.assistant
        .say(Script.REQUEST_ADDRESS)
        .reprompt.say(Script.REQUEST_ADDRESS) 
        .finish()
}

function updateTimeForAmPM(timeMatch, amPM)
{
    let hour = parseInt(timeMatch.substring(0,2))
    if(amPM == 1 && hour < 12)
    {
        return hour+12 + timeMatch.slice(2)
    }else {
        return timeMatch
    }
}

function timeFollowUp(Context, dateMatch, timeMatch, amPM)
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
            .say("Perfect, thank you. ")
            .pause("500ms")
            .say(Script.REQUEST_ADDRESS)
            .reprompt.say(Script.REQUEST_ADDRESS)
            .finish()
    }
}



module.exports = RecordDayOfSighting

