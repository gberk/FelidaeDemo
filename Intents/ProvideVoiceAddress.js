
var ProvideVoiceAddress = function(Context){
    console.log(Context.args)

    Context.assistant
        .say("I got something")
        .finish({exit: true})
}

module.exports = ProvideVoiceAddress