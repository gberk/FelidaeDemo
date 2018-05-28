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
        "In {'city': 'Framingham'}",
        "{'park':'Point Reyes national park'}",
        "{'landmark':'coit tower'}",
        "I was in {'landmark': 'the boston common'}",
        "At {'landmark': 'Pismo Beach'}",
        "the {'localBusiness':'starbucks'} in {'city':'marin'}",
        "{'localBusiness':'jiffy lube'} in {'city':'san francisco'}",
        "next to {'localBusiness':'village'} in {'city':'oakland'}",
        "next to the {'localBusiness':'mcdonalds'} in {'city':'columbus'}",
        "near the {'localBusiness':'cafe'} in {'city':'sonoma'}",
        "near {'localBusiness':'Joinery'} in {'city':'sausalito'}",
        "a few feet from {'localBusiness':'Bar Bocce'} in {'city':'sausalito'}",
        "At {'fullAddress':'300 Turney Street Sausalito California'}",
        "At {'streetAddress':'Turney Street'} {'city':'Sausalito'}",
        "Over at {'fullAddress':'300 Turney Street Sausalito California'}",
        "Over at {'streetAddress':'Turney Street'} {'city':'Sausalito'}"
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
        },
        "park" : {
            dataType: ["@sys.place-attraction-us", "AMAZON.CivicStructure"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "landmark" : {
            dataType: ["@sys.location", "AMAZON.LandmarksOrHistoricalBuildings"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        },
        "localBusiness" : {
            dataType: ["@sys.location", "AMAZON.LocalBusiness"],
            isList: false,
            required: false,
            prompts: [
                "Sorry, I didn't get your location. Could you say it again?"
            ]
        }
    }
}

module.exports = GrabLocation;