var StateProvider = require('../DataStores/StateProvider')
var UserStore = require('../DataStores/UserStore')
var Report = require('../DataStores/Reports')

var AmPm = function(Context){
    return new Promise((resolve, reject) => {
        StateProvider.getState(Context)
            .then(currentState => {
            if(currentState != "gettingMeridiem") resolve();
            
            UserStore.get(Context).then((userData) => {
                Report.findById(userData.reportId, (err, report) => {
                    let inProgressDate = userData.inProgressDate;
                    report.dateOfSighting = inProgressDate.dateMatch;
                    let amPM = Context.intentName == "Afternoon" ? "pm" : "am"
                    report.timeOfSighting = updateTimeForAmPM(inProgressDate.timeMatch, amPM)
                    console.log(`Saving time of sighting: ${report.dateOfSighting} @ ${report.timeOfSighting}`)
                    report.save()
                    resolve()
                })
            })
        })
    })
}

function updateTimeForAmPM(timeMatch, amPM)
{
    let hour = parseInt(timeMatch.substring(0,2))
    if(amPM == "pm" && hour < 12)
    {
        return hour+12 + timeMatch.slice(2)
    }else {
        return timeMatch
    }
}

module.exports = AmPm