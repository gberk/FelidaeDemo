const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)
const StateProvider = require('../DataStores/StateProvider')

var felidaeFundTeam = [process.env.RFLABS_NUMBER, "+17325464315"]
var smsBody = 'Hello from Felidae Fund Sightings Report app'

var permission_fulfillment = function(Context){
    StateProvider.setState(Context, "gettingPublicSafetyResponse")

    Promise.all(felidaeFundTeam.map(number => {
        return twilio.messages.create({
            to: number,
            from: process.env.TWILIO_MESSAGING_SERVICE_SID,
            body: smsBody
        })
    })).then((message) => {
        console.log(message.sid)
    }).catch((error) => {
        console.log(error)
    })

    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
    
}

module.exports = permission_fulfillment;
