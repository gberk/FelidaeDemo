var mongoose = require('mongoose')

//Credit to: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
var generateURL = function(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

var reportSchema = new mongoose.Schema(
{
    reportedByUser: String,
    isTest: {type:Boolean, default: true},
    dateOfSighting: String,
    timeOfSighting: String,
    latlonOfSighting: String,
    addressOfSighting: String,
    email: String,
    liveSighting: String,
    url: {type:String, default: generateURL(6)}
    
}, {timestamps: true})



module.exports = mongoose.model('Report', reportSchema)