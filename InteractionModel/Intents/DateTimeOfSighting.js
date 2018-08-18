var DateTimeOfSighting = {
    name: "DateTimeOfSighting",
    utterances: [
        "This was {'dateOfSighting': 'yesterday'}",
        "This happened {'dateOfSighting': 'two days ago'}",
        "It was {'dateOfSighting': 'last week'}",
        "{'dateOfSighting': 'yesterday'}",
        "I think it was around {'dateOfSighting': 'yesterday'}",
        "I think around {'dateOfSighting': 'yesterday'}",
        "around {'dateOfSighting': 'yesterday'}",
        "maybe around {'dateOfSighting': 'yesterday'}",
        "sometime around {'dateOfSighting': 'yesterday'}",
        "Earlier {'dateOfSighting': 'today'}",
        "At {'dateOfSighting':'two last night'}"
        ],
    slots: {
        "dateOfSighting": {
            dataType: ["@sys.date-time", "AMAZON.DATE"],
            isList: false,
            required: false
        }
    }
}

module.exports = DateTimeOfSighting