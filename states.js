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
    'gettingTimeOfSighting': {
        activeIntents: ["Welcome", "DateTimeOfSighting"]
    },
    'gettingLocation': {
        activeIntents: ["Welcome","GrabLocation"],
        middleware: []
    }
}

module.exports = States