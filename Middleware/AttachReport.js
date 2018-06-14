
var Report = require('../DataStores/Reports')
var UserStore = require('../DataStores/UserStore')

var AttachReport = function(Context){
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