var States = {

    'default': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback"
        ],
        middleware: ["Fallback"]
    },

    'gettingPublicSafetyResponse': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "Affirmative",
            "Negative",
            "RequestLocation"
        ],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },

    'gettingPresentSighting': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "Affirmative",
            "Negative",
            "Earlier",
            "RequestDayOfSighting",
            "RequestLocation"
        ],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestDayOfSighting",
        skipTo: "RequestDayOfSighting"
    },

    'gettingDayOfSighting': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "DateTimeOfSighting"
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },

    'gettingTimeOfSighting': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "DateTimeOfSighting"
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },

    'gettingGPSLocation': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "permission_fulfillment",
            "RequestLocation",
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "permission_fulfillment",
        negative: "RequestLocation",
        skipTo: "Summary"
    },

    'gettingLocation': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "RecordLocation",
            "GrabLocation",
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat"],
        skipTo: "Summary"
    },

    "askingToSubmitReport": {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "Affirmative",
            "Negative"
        ],
        middleware: ["Fallback", "AttachReport", "Repeat","RespondToYesNo"],
        affirmative: "SubmitReport",
        negative: "DoNotSubmit",
    },

    'captureFeedback': {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            "StartFeedback",
            // unique
            "CaptureFeedback",
            "GrabLocation"
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat", "Feedback"],
        skipTo: "Welcome"
    }
}

module.exports = States