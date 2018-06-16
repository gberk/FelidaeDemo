var StateProvider = require('../DataStores/StateProvider')
var UserStore = require('../DataStores/UserStore')
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
    StateProvider.setState(Context, "askingToSubmitReport")
    UserStore.set(Context, {previousMessage: Script.SIGHTING_REPORTED})
    Context.assistant
        .say(Script.SIGHTING_REPORTED)
        .finish();
}

module.exports = Summary;