const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)
const StateProvider = require('../DataStores/StateProvider')

// Phone numbers to alert with SMS
var felidaeFundTeam = [process.env.RFLABS_NUMBER]
// SMS message
var smsBody = "This is a sightings alert!"

var permission_fulfillment = function(Context){

    // Twilio messaging service
    if (process.env.TWILIO_TRIGGER === 'active') {
        Promise.all(felidaeFundTeam.map(number => {
            return twilio.messages.create({
                to: number,
                from: process.env.TWILIO_MESSAGING_SERVICE_SID,
                body: smsBody
            })
        })).then(message => {
            console.log("Alert Felidae Fund team SMS sent!")
        }).catch(err => {
            console.log(err)
        })
    }
    
    if (Context.location) {
        Context.assistant
            .say("Sighting has been reported." 
                + "Your report number is 1234. " 
                + "If you'd like to follow up with a Felidae Fund staff member, "
                + "please email us at info@felidaefund.org or call us at 415-354-5655. "
                + "You can always come back to ask us about your report number or how to contact us. "
                + "Thank you for the report. Good bye!"
            )
            .finish({"exit":true});
    } else {
        StateProvider.setState(Context, "gettingLocation")
        Context.assistant
            .say("Can you tell me the the name of the nearest landmark " 
                + "or nearest address to where you sighted the puma?" 
            )
            .finish();
    }
}

module.exports = permission_fulfillment;
