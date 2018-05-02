var Ayva = require('../../ayva')
var StateConfig = require('../states') //Can replace this with an Ayva helper?
var Affirmative = function(Context){
    //Look up affirmative answer given state
    var currentState = Ayva.StateProvider.getState(Context)
    var intentToExecute = StateConfig[currentState].affirmative
}