var mongoose = require('mongoose')

var StateProvider = require('./StateProvider')
var UserStore = require('./UserStore')

var Interaction = new mongoose.Schema(
    {
        state: String,
        intent: String,
        slots: String,
        speechInput: String
    }
)

var conversationLogSchema = new mongoose.Schema(
{
    userId: String,
    conversationId: String,
    interactions: [{type: Interaction, default:[]}],
}, {timestamps: true})


conversationLogSchema.statics.log = function(Context){
    return new Promise((resolve,reject) =>{
        UserStore.get(Context)
        .then((userData) =>{
            if(!userData.conversationId)
                console.log("ConversationLog: Couldn't get conversationId from user store")

            this.findById(userData.conversationId)
            .then((conversationLog) => {
                StateProvider.getState(Context)
                    .then((state) => {
                        var interaction = {
                            state:  state,
                            intent: Context.intentName,
                            slots: JSON.stringify(Context.args)
                        }
                        conversationLog.interactions.push(interaction)
                        conversationLog.markModified('interactions')
                        conversationLog.save().then((data) => {console.log(data)}).catch((err) => {console.log(err)})
                    })
            })
            .catch((err) => {console.log("ConversationLog: " + err)})
        })
    })
}


module.exports = mongoose.model('ConversationLog', conversationLogSchema)