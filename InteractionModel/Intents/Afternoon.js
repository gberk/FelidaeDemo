var Afternoon = {
    name: "Afternoon",
    utterances: [
        "it was in the afternoon",
        "it was at night",
        "it was around {'time':1} in the afternoon",
        "it was {'time':1} in the afternoon",
        "it was {'time':2} p.m",
        "it was around {'time':2} p.m",
        "in the afternoon",
        "afternoon",
        "at night",
        "in the night",
        "p.m.",
        "in the p.m.",
        "{'time': 2} in the afternoon",
        "{'time': 10} at night",
        "{'time': 3} p.m."
    ],
    slots: {
        "time": {
            dataType: ["@sys.time", "AMAZON.DATE"],
            isList: false,
            required: false
        }
    }
}
 module.exports = Afternoon; 