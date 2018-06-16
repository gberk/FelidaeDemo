var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

var Summary = function(Context){
    var location = {
        fullAddress: Context.args.fullAddress,
        streetAddress: Context.args.streetAddress,
        city: Context.args.city,  
        park: Context.args.park,
        landmark:  Context.args.landmark, 
        localBusiness: Context.args.localBusiness
    }
    Context.report.addressOfSighting = JSON.stringify(location)
    Context.report.save()
    Context.assistant
        .say(Script.SIGHTING_REPORTED)
        .finish({"exit":true});
}

module.exports = Summary;