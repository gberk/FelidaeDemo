var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

var Summary = function(Context){
    Context.assistant
        .say(Script.SIGHTING_REPORTED)
        .finish({"exit":true});
}

module.exports = Summary;