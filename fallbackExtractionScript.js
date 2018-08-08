var mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, (err) => {if (err) console.log("Mongoose error: " + err)
var ConversationLog = require("./DataStores/ConversationLog")

ConversationLog.find({}, (err, convos) => {
    for(i in convos){
        convos[i].interactions.forEach((interaction) => {
            interaction.intent == "Fallback" && console.log(interaction.state, interaction.rawInput)
                
        })
    }
})

});



