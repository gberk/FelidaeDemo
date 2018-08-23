var Morning = {
    name: "Morning",
    utterances: [
        "it was in the morning",
        "it was in the a.m.",
        "it was {'time':2} in the morning",
        "it was {'time':2} a.m.",
        "in the morning",
        "morning",
        "a.m.",
        "in the a.m.",
        "{'time': 2} in the morning",
        "{'time': 3} a.m."
    ],
    slots: {
        "time": {
            dataType: ["@sys.time", "AMAZON.DATE"],
            isList: false,
            required: false
        }
    }
}
 module.exports = Morning 