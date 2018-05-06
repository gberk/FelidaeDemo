var States = {
    'default': {
        activeIntents: ['Welcome'],
        middleware: []
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Affirmative","Negative","RequestDayOfSighting","RequestLocation"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting"
    },
    'gettingGPSLocation': {
        activeIntents: ["permission_fulfillment"]
    }
}

module.exports = States