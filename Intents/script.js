var Script = {}

Script.WELCOME = "Is there an immediate public safety concern?"

Script.CURRENT_SIGHTING = "Did this sighting just occur?";

Script.REQUEST_ADDRESS = "Now, can you give me an address close to where this happened?";

Script.REQUEST_LOCATION_PERMISSION = "If you don't mind, I can attach your current GPS location to this report. " 
                                    + "To do that,"

Script.REQUEST_DATETIME_OF_SIGHTING = "What day and time did you see the animal?"

Script.REPEAT_TIME_OF_SIGHTING = "Around what time of day did you see the animal? " 
                                + "If you don't remember, you can say I don't remember"
                                
Script.REQUEST_TIME_OF_SIGHTING = "And, around what time was it?"

Script.SIGHTING_REPORTED = "Thank you. " 
                        + "Would you like to send this report to the Felidae team?" 
                        

Script.REPORT_SUBMITTED_MOBILE = "Your report has been submitted. "
                            + "If you would like a member of the Felidae Fund to follow up, "
                            + "please use the link below to leave us your email. "
                            + "Thank you!"

Script.REPORT_SUBMITTED = "Your report has been submitted. "
                            + "If you would like to follow up, "
                            + "please contact us at info@felidaefund.org "
                            + "Thank you!"

Script.REPORT_NOT_SUBMITTED = "Ok, I have not submitted this report. "
                            + "Thank you"

Script.FEEDBACK_REQUEST = "Thank you for electing to leave us feedback. Can you describe your suggestion, question, or bug?"

module.exports = Script