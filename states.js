var States = {
    'default': {
        activeIntents: ['Welcome', "Fallback", "Repeat"],
        middleware: ["Fallback"]
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK", "Fallback", "Repeat"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK", "Fallback", "Repeat"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },
    'gettingTimeOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation", "Fallback", "Repeat"],
        middleware: ["RespondToYesNo", "Fallback", "AttachReport", "Repeat"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK", "Fallback", "GrabLocation", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    }
}

module.exports = States