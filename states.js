var States = {
    'default': {
        activeIntents: ['Welcome', "Fallback"],
        middleware: ["Fallback"]
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK", "Fallback"],
        middleware: ["RespondToYesNo", "Skip", "Fallback"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK", "Fallback"],
        middleware: ["RespondToYesNo", "Skip", "Fallback"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback"],
        middleware: ["Skip", "Fallback"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation", "Fallback"],
        middleware: ["RespondToYesNo", "Fallback"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK", "Fallback"],
        middleware: ["Skip", "Fallback"],
        skipTo: "Summary"
    }
}

module.exports = States