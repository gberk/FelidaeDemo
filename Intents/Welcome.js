var Welcome = function(Context){
    Context.assistant
    .say("Is this concerning immediate public safety?")
    .finish()
}

module.exports = Welcome;