var States = {
    'default': {
        activeIntents: ['Welcome', "Fallback", "EnableTest", "EnableProd"],
        middleware: ["Fallback"]
    },
    'gettingPublicSafetyResponse': {
        activeIntents: ["Welcome","Affirmative","Negative","RequestLocation", "RequestPastOrPresentSighting","IDK", "Fallback", "EnableTest", "EnableProd"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport"],
        affirmative: "RequestLocation",
        negative: "RequestPastOrPresentSighting",
        skipTo: "RequestPastOrPresentSighting"
    },
    'gettingPresentSighting': {
        activeIntents: ["Welcome","Affirmative","Negative","Earlier","RequestDayOfSighting","RequestLocation", "IDK", "Fallback", "EnableTest", "EnableProd"],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },
    'gettingDayOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "EnableTest", "EnableProd"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    },
    'gettingTimeOfSighting': {
        activeIntents: ["Welcome", "IDK", "Fallback", "DateTimeOfSighting", "EnableTest", "EnableProd"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    },
    'gettingGPSLocation': {
        activeIntents: ["Welcome","permission_fulfillment","RequestLocation", "Fallback", "EnableTest", "EnableProd"],
        middleware: ["RespondToYesNo", "Fallback", "AttachReport"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
    },
    'gettingLocation': {
        activeIntents: ["Welcome","RecordLocation", "IDK", "Fallback", "GrabLocation", "EnableTest", "EnableProd"],
        middleware: ["Skip", "Fallback", "AttachReport"],
        skipTo: "Summary"
    }
}

module.exports = States