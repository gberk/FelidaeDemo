var mongoose = require('mongoose')


module.exports.run = function(){
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI, (err) => {
            if (err) console.log("Mongoose error: " + err)
        
            var ConversationLog = require("../DataStores/ConversationLog")
            let fallback = []
            ConversationLog.find({"interactions.1": {"$exists":true}}, (err, convos) => {  //only select where Welcome is not the only intent. We should go back and stop logging Welcome since we get it from google's pings
                if(err) return reject(err)
                for(i in convos){
                    convos[i].interactions.forEach((interaction) => {
                        if(interaction.intent == "Fallback")
                        {
                            fallback.push({...interaction._doc, conversationId: convos[i]._id})
                        }
                    })
                }
                resolve(fallback);
            })
        });
    });
}