// Name Intent
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
        "{'city':'Columbus'}"
    ],
    slots: {
        "fullAddress" : {
            dataType: "@sys.address",
            dataType_alexa: "AMAZON.PostalAddress",
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "streetAddress" : {
            dataType: "@sys.street-address",
            dataType_alexa: "AMAZON.StreetAddress",
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "city" : {
            dataType: "@sys.geo-city-us",
            dataType_alexa: "AMAZON.US_CITY",
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        }
    }
}

module.exports = GrabLocation;