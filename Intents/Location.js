
var Location = function(Context){
    console.log(Context.assistant.device);

    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
}

module.exports = Location;