var permission_fulfilled = function(Context){
    Context.assistant
        .say("Got it!")
        .finish({"exit":true});
}

module.exports = permission_fulfilled;