var StateProvider = require('../DataStores/StateProvider')

var Summary = function(Context){
    Context.assistant
        .say("Sighting has been reported. " 
            + "Your report number is 1234. " 
            + "If you'd like to follow up with a Felidae Fund staff member, "
            + "please email us at founders@refreshlabs.co or call us at 415-111-1111. "
            + "You can always come back to ask us about your report number or how to contact us. "
            + "Thank you for the report. Good bye!"
        )
        .finish({"exit":true});
}

module.exports = Summary;