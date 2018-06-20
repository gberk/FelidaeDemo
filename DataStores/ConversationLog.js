var mongoose = require('mongoose')

var StateProvider = require('./StateProvider')
var UserStore = require('./UserStore')

var Interaction = new mongoose.Schema(
    {
        state: String,
        intent: String,
        slots: String,
        rawInput: String,
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
    UserStore.get(Context)
        .then((userData) =>{
            if(!userData.conversationId)
                console.log("ConversationLog: Couldn't get conversationId from user store")
            else{
                this.findById(userData.conversationId)
                .then((conversationLog) => {
                    StateProvider.getState(Context)
                        .then((state) => {
                            var interaction = {
                                state:  state,
                                intent: Context.intentName,
                                rawInput: Context.rawInput || "",
                                slots: JSON.stringify(Context.args)
                            }
                            console.log(interaction)
                            conversationLog.interactions.push(interaction)
                            conversationLog.markModified('interactions')
                            conversationLog.save()
                        })
                    })
            }
        }).catch((err) => {console.log("ConversationLog: " + err)})
}


module.exports = mongoose.model('ConversationLog', conversationLogSchema)