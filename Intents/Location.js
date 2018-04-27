
var Location = function(Context){
    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
}

module.exports = Location;