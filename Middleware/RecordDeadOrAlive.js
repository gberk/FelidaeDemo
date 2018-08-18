var StateProvider = require('../DataStores/StateProvider')
var UserStore = require('../DataStores/UserStore')
var Report = require('../DataStores/Reports')

var RecordDeadOrAlive = function(Context){
    return new Promise((resolve, reject) => {
        StateProvider.getState(Context)
            .then(currentState => {
            console.log(currentState)
            if(currentState != "gettingPumaAliveOrDead") resolve();

            UserStore.get(Context).then((userData) => {
                Report.findById(userData.reportId, (err, report) => {
                    //Alive or "yes (it was still living)"
                    if(Context.intentName == "Alive" || Context.intentName == "Affirmative")
                    {
                        report.liveSighting = "true"
                    }
                    //Dead
                    if (Context.intentName == "Dead" || Context.intentName == "Negative")
                    {
                        report.liveSighting = "false"
                    }
                    report.save()
                    resolve()
                })
            })
        })
    })
}

module.exports = RecordDeadOrAlive