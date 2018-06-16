var States = {
    'default': {
        activeIntents: ['Welcome', "Fallback", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["Fallback"]
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK", "Fallback", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK", "Fallback", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },
    'gettingTimeOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation", "Fallback", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
        skipTo: "Summary"
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK", "Fallback", "GrabLocation", "EnableTest", "EnableProd", "Repeat"],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    }
}

module.exports = States