var Intents = {}

Intents.Welcome = require('./Welcome');
Intents.Report = require('./Report');
Intents.permission_fulfilled = require('permission_fulfilled');
Intents.ProvideVoiceAddress = require('./ProvideVoiceAddress')
Intents.ProvideEmail = require('./ProvideEmail')

module.exports = Intents;