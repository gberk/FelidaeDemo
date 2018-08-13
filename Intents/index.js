var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.WelcomeAlt = require('./Welcome');
Intents.RequestLocation = require('./RequestLocation');
Intents.JustOccurred = Intents.RequestLocation;

Intents.RequestDeadOrAlive = require('./RequestDeadOrAlive')

Intents.permission_fulfillment = require('./permission_fulfillment');
Intents.RequestDayOfSighting = require('./RequestDayOfSighting')

Intents.Dead = Intents.RequestDayOfSighting;
Intents.Alive = Intents.RequestDayOfSighting;

Intents.GrabLocation = require('./Summary')
Intents.DateTimeOfSighting = require('./RecordDayOfSighting')
Intents.Summary = require("./Summary")

Intents.Fallback = require("./Fallback")
Intents.Repeat = require('./Fallback')

Intents.SubmitReport = require('./SubmitReport')
Intents.DoNotSubmit = require('./DoNotSubmit')
Intents.StartFeedback = require("./StartFeedback")
Intents.CaptureFeedback = require("./CompleteFeedback")
Intents.EndConversation = require('./EndConversation')


module.exports = Intents;