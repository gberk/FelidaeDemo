
var permission_fulfilled = function(Context){
    console.log()
    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
}

module.exports = permission_fulfilled;