var States = {
    'default': {
        activeIntents: ['Welcome'],
        middleware: []
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier"],
        middleware: ["RespondToYesNo"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        middleware: [],
        activeIntents: ["Welcome", "DateTimeOfSighting"]
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment"],
        middleware: []
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation"],
        middleware: []
    }
}

module.exports = States