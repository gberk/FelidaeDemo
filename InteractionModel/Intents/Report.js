const Report = {
    name: "Report",
    utterances: [
        "I just saw a {'bigCat': 'puma'}",
        "I just saw a big cat",
        "There's a puma outside",
        "What do I do about the puma outside",
        "Can someone help with the lynx outside"
    ],
    slots: {
        "bigCat":{
            "dataType": ["BigCats"]
        }
    }
}

module.exports = Report;