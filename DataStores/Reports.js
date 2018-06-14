var mongoose = require('mongoose')

var reportSchema = new mongoose.Schema(
{
    reportedByUser: String,
    isTest: {type:Boolean, default: true},
    timeOfSighting: Date,
    latlonOfSighting: String,
    addressOfSighting: String
    
}, {timestamps: true})

module.exports = mongoose.model('Report', reportSchema)