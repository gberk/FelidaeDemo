var UserStore = require('../DataStores/UserStore')
const states = require('../states')

var Repeat = function(Context){
    return new Promise((resolve, reject) => {
        if(Context.intentName != "Repeat") resolve();

        else {
            UserStore.get(Context)
                .then((data) => {
                    Context.assistant
                    .say(data.previousMessage)
                    resolve()
                })    
        }
    })
}

module.exports = Repeat