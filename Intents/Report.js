
var Report = function(Context){
    Context.assistant
        .location()
        .finish()
    console.log(Context.assistant)
}

module.exports = Report;