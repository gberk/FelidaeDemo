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
            "RequestLocation",
            "RequestDeadOrAlive"
        ],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "RequestLocation",
        negative: "RequestDeadOrAlive",
        skipTo: "RequestDeadOrAlive"
    },

    'gettingPumaAliveOrDead' : {
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
            "Dead",
            "Alive",
            "RequestDayOfSighting"
        ],
        middleware:["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat", "RecordDeadOrAlive"],
        affirmative: "Alive",
        negative:"Dead",
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
        skipTo: "RequestLocation"
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
        skipTo: "RequestLocation"
    },

    'gettingMeridiem': {
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
            "Affirmative",
            "Negative",
            // unique
            "DateTimeOfSighting",
            "Afternoon",
            "Morning"
        ],
        middleware: ["Skip", "Fallback", "AttachReport", "Repeat", "AmPm", "RespondToYesNo"],
        affirmative: "Afternoon",
        negative: "Morning",
        skipTo: "RequestLocation"
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
    },

    "requestingFeedback": {
        activeIntents: [
            // standard
            "Welcome",
            "WelcomeAlt",
            "IDK",
            "Fallback",
            "EnableTest",
            "EnableProd",
            "Repeat",
            //unique
            "CaptureFeedback",
            "StartFeedback",
            "EndConversation",
            "Affirmative",
            "Negative"
        ],
        middleware: ["RespondToYesNo", "Skip", "Fallback", "AttachReport", "Repeat"],
        affirmative: "StartFeedback",
        negative: "EndConversation"
    }
}

module.exports = States