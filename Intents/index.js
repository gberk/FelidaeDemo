var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.RequestLocation = require('./RequestLocation');
Intents.JustOccurred = Intents.RequestLocation;
Intents.permission_fulfillment = require('./permission_fulfillment');
Intents.RequestPastOrPresentSighting = require("./RequestPastOrPresentSighting")
Intents.RequestDayOfSighting = require('./RequestDayOfSighting')
Intents.GrabLocation = require('./Summary')
Intents.DateTimeOfSighting = require('./RecordDayOfSighting')
Intents.TimeOfSighting = require('./RecordTimeOfSighting')

module.exports = Intents;