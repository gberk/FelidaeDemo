var StateProvider = require("../DataStores/StateProvider")

var RecordDayOfSighting = function(Context){
    console.log(Context.args)
    var hasDate, hasTime, recordedDate;

    //Did we not get anything?
    if(!Context.args.dateOfSighting || Context.args.dateOfSighting.length==0)
    {
        
    }

    //Does the date have a timestamp? Skip time question
    if(Context.args.dateOfSighting.length == 20) //Is this enough?
    {
        hasDate = hasTime = true;
    }   
    //Is there just a time? Assume today.
    if(Context.args.dateOfSighting.length == 8)
    {
        hasDate = false;
        hasTime = true;
        //
    }
    //Is the date in the future? Rewind to this year


    Context.assistant
        .say("Thanks. What time did this sighting occur?")
        .finish()
}

module.exports = RecordDayOfSighting