const Script = require('./script')
const ConversationLog = require('../DataStores/ConversationLog')
const StateProvider = require('../DataStores/StateProvider')

var SubmitReport = function(Context){
    ConversationLog.log(Context)
    Context.report.isTest = false;

    if (Context.deviceProfile.isMobile()) {
    	Context.assistant
		.say(Script.REPORT_SUBMITTED_MOBILE)
		.card({
			"basicCard": {
				"title": "Follow-up with Felidae Conservation Fund",
				"subtitle": "",
				"formattedText": "Leave your email so a member of the Felidae Conservation Fund team can follow-up with you on your sightings report.",
				"image": {
					"url": "https://storage.googleapis.com/ff-sightingsreport.appspot.com/felidae-fb.jpeg",
					"accessibilityText": "image attribute"
				},
				"buttons": [{
					"title": "Register email",
					"openUrlAction": {
						"url":  process.env.WEBSITE_BASEURL + "/notification?report="+ Context.report.url 
					}
				}]
			}
		})
    } else {
		Context.assistant
        .say(Script.REPORT_SUBMITTED)
	}

	UserStore.set(Context, {previousMessage: Script.REQUEST_FEEDBACK})
	StateProvider.setState(Context, "requestingFeedback")
	Context.assistant
	.pause("1s").say("Before you go, ").pause("600ms")
	.say(Script.REQUEST_FEEDBACK)
	.setContext("feedback", 10)
	.finish()
    Context.report.save()
}

module.exports = SubmitReport;