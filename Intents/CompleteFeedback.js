const axios = require('axios')

const ConversationLog = require('../DataStores/ConversationLog')
var UserStore = require("../DataStores/UserStore")
var CompleteFeedback = function(Context){    
    ConversationLog.log(Context)
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

    let feedback;
    UserStore.get(Context).then((userData) => 
    {
        var conversationId = userData.conversationId;
        feedback =  conversationId + " || " + platform + " - " + isMobile + " || " + Context.rawInput;
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
    })

    Context.assistant
        .say("Thank you. Your feedback has been sent to the team.")
        .finish({"exit":true});
}

module.exports = CompleteFeedback;