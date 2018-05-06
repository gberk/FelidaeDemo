var States = {
    'default': {
        activeIntents: ['Welcome'],
        middleware: []
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "GetTimeOfSighting"
    },
    'gettingGPSLocation': {
        activeIntents: ["permission_fulfillment"]
    }
}

module.exports = States