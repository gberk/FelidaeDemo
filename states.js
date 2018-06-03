var States = {
    'default': {
        activeIntents: ['Welcome'],
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK"],
        middleware: ["RespondToYesNo", "Skip"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK"],
        middleware: ["RespondToYesNo", "Skip"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK"],
        middleware: ["Skip"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation"],
        middleware: ["RespondToYesNo"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK"],
        middleware: ["Skip"],
        skipTo: "Summary"
    }
}

module.exports = States