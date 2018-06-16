var StateProvider = require('../DataStores/StateProvider')
var Script = require('./script')

const axios = require('axios')

var CompleteFeedback = function(Context){    
    let platform = "Unknown"
    let isMobile = "Speaker"
    if (Context.deviceProfile.isMobile()) {
        isMobile = "Mobile"
    }
    if (Context.deviceProfile.platform === "google") {
        platform = "Google"
    }
    if (Context.deviceProfile.platform === "alexa") {
        platform = "Alexa"
    }
    let feedback = platform + " || " + isMobile + " || user: " + Context.args.feedback;
    axios({
        method: 'post',
        headers:{"Content-type":"application/json"},
        data: {text: feedback},
        url: process.env.FEEDBACK_RIVER_URL
    }).then((response) => {
        console.log("Feedback sent to Slack successfully.")
    }).catch((error) => {
        console.log("Feedback error: " + error)
    })
    Context.assistant
        .say("Thank you. Your feedback has been sent to the team.")
        .finish({"exit":true});
}

module.exports = CompleteFeedback;