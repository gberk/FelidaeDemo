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
        activeIntents: ["Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: [""]
    },
    'gettingGPSLocation': {
        activeIntents: ["permission_fulfillment", "finalSummary"]
    }
}

module.exports = States