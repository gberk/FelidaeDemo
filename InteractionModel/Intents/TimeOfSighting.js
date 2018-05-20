var TimeOfSighting = {
    name: "TimeOfSighting",
    utterances: [
        "{'preciseTime': '2PM'}",
        "Around {'preciseTime': 'noon'}",
        "It was {'generalTime': 'late afternoon'}",
        "It was in {'generalTime': 'the morning'}"
    ],
    slots: {
        "preciseTime": {
            dataType: ["@sys.time"],
            isList: false,
            required: false
        },
        "generalTime": {
            dataType: ["@sys.time-period"],
            isList: false,
            required: false
        }
    }
}

module.exports = TimeOfSighting