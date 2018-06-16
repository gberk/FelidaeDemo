
var Report = require('../DataStores/Reports')
var UserStore = require('../DataStores/UserStore')

var AttachReport = function(Context){
    //TODO: Check if this is a test request to determine whether to pass fake Report {}

    return new Promise( (resolve, reject) => {
        UserStore.get(Context)
        .then((userData) => {
            Report.findById(userData.reportId, (err, report) => {
                Context.report = report;
                resolve()
            })
        })
    })
}

module.exports = AttachReport;