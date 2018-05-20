var DateTimeOfSighting = {
    name: "DateTimeOfSighting",
    utterances: [
        "This was {'dateOfSighting': 'yesterday'}",
        "This happened {'dateOfSighting': 'two days ago'}",
        "It was {'dateOfSighting': 'last week'}",
        "{'dateOfSighting': 'yesterday'}"
    ],
    slots: {
        "dateOfSighting": {
            dataType: ["@sys.date-time", "AMAZON.date"],
            isList: false,
            required: false
        }
    }
}

module.exports = DateTimeOfSighting