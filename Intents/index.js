var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.RequestLocation = require('./RequestLocation');
Intents.JustOccurred = Intents.RequestLocation;
Intents.permission_fulfilled = require('./permission_fulfilled');
Intents.RequestPastOrPresentSighting = require("./RequestPastOrPresentSighting")
Intents.RequestDayOfSighting = require('./RequestDayOfSighting')

module.exports = Intents;