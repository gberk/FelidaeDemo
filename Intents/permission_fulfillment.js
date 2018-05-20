const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)
const StateProvider = require('../DataStores/StateProvider')

// Phone numbers to alert with SMS
var felidaeFundTeam = [process.env.RFLABS_NUMBER, process.env.KEVIN_NUMBER]
// SMS message
var smsBody = "This is a sightings alert!"

var permission_fulfillment = function(Context){

    // Twilio messaging service
    Promise.all(felidaeFundTeam.map(number => {
        return twilio.messages.create({
            to: number,
            from: process.env.TWILIO_MESSAGING_SERVICE_SID,
            body: smsBody
        })
    })).then(message => {
        console.log("Message SID: " + message.sid)
    }).catch(err => {
        console.log(err)
    })

    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
    
}

module.exports = permission_fulfillment;
