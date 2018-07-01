var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.WelcomeAlt = require('./Welcome');
Intents.RequestLocation = require('./RequestLocation');
Intents.JustOccurred = Intents.RequestLocation;

Intents.permission_fulfillment = require('./permission_fulfillment');
Intents.RequestDayOfSighting = require('./RequestDayOfSighting')
Intents.GrabLocation = require('./Summary')
Intents.DateTimeOfSighting = require('./RecordDayOfSighting')
Intents.Summary = require("./Summary")

Intents.Fallback = require("./Fallback")
Intents.Repeat = require('./Fallback')

Intents.SubmitReport = require('./SubmitReport')
Intents.DoNotSubmit = require('./DoNotSubmit')
Intents.StartFeedback = require("./StartFeedback")
Intents.CaptureFeedback = require("./CompleteFeedback")

module.exports = Intents;