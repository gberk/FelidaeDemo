var CaptureFeedback = {
    name: "CaptureFeedback",
    utterances: [
        "{'feedback': 'this is my feedback'}",
    ],
    slots: {
        "feedback": {
            dataType: ["@sys.any", "AMAZON.LITERAL"],
            isList: false,
            required: false
        }
    }
}

module.exports = CaptureFeedback