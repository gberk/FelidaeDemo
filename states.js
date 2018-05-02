var States = {
    'default': {
        activeIntents: ['Welcome'],
        middleware: []
    },
    'isPublicSafetyResponse': {
        activeIntents: ["ConfirmEmergency", "DenyEmergency"],
        middleware: ["RespondToYesNo"],
        affirmative: "ConfirmEmergency",
        negative: "DenyEmergency"
    }
}

module.exports = States
