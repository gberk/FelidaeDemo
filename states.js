var States = {
    'default': {
        activeIntents: ['Welcome', "Fallback"],
        middleware: ["Fallback"]
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK", "Fallback"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK", "Fallback"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    },
    'gettingTimeOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation", "Fallback"],
        middleware: ["RespondToYesNo", "Fallback", "AttachReport"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK", "Fallback", "GrabLocation"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    }
}

module.exports = States