var TimeOfSighting = {
    name: "TimeOfSighting",
    utterances: [
        "{'preciseTime': '3:40'}",
        "{'preciseTime': '4 am'}",
        "{'preciseTime': '2 PM'}",
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