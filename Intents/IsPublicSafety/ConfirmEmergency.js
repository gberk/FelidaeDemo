var ConfirmEmergency = function(Context){
    console.log(Context.args)
    Context.assistant
        .say("You just provided your email")
        .finish()
}

module.exports = ConfirmEmergency