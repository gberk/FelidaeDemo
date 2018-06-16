var UserStore = require('../DataStores/UserStore')
var Script = require('./script')
var EnableProd = function(Context){
    UserStore.get(Context).then((data) => {
        Context.assistant
            .say("Production mode enabled. ")
            .say(data.previousMessage)
            .finish()
        resolve()
    })   
}

module.exports = EnableProd;