var GrabLocation = {
    name: 'GrabLocation',
    utterances: [
        "{'fullAddress':'300 Turney Street Sausalito California'}",
        "{'streetAddress':'Turney Street'} {'city':'Sausalito'}",
        "{'streetAddress':'Turney Street'}",
        "{'city':'Sausalito'}",
        "{'fullAddress':'700 Deer Run Columbus Ohio 43230'}",
        "{'streetAddress':'Deer Run'} {'city':'Columbus'}",
        "{'streetAddress':'Deer Run'}",
        "{'city':'Columbus'}",
        "In {'city': 'Framingham'}"
    ],
    slots: {
        "fullAddress" : {
            dataType: ["@sys.address", "AMAZON.PostalAddress"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "streetAddress" : {
            dataType: ["@sys.street-address", "AMAZON.StreetAddress"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "city" : {
            dataType: ["@sys.geo-city-us", "AMAZON.US_CITY"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        }
    }
}

module.exports = GrabLocation;