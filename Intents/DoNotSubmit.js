var DoNotSubmit = function(Context){
    Context.assistant
    .say("Thank you")
    .finish({"exit": true})
}

module.exports = DoNotSubmit