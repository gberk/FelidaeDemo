var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.RequestLocation = require('./RequestLocation');
Intents.JustOccurred = Intents.RequestLocation;
Intents.permission_fulfilled = require('./permission_fulfilled');
Intents.RequestPastOrPresentSighting = require("./RequestPastOrPresentSighting")

module.exports = Intents;