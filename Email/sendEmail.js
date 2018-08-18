const sgMail = require('@sendgrid/mail')

var emailBody= ' \
<!DOCTYPE html> \
<html> \
<head> \
    <link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet"> \
    <meta name="viewport" content="width=device-width, initial-scale=1"> \
    <title>Puma Report</title> \
</head> \
<body> \
    <div class="main" style="display: block;width:100%;font-family: \'Lato\', sans-serif;display: block;margin-left: auto;margin-right: auto;"> \
        <div class="contentBox" style="display: block;margin-left: auto;margin-right: auto;padding: 20px 20px 20px 20px;width:80%;justify-content: center;background-color: #F1F5F7;"> \
            <div class="imgBox" style="padding: 0 0 20px 0;"> \
                <img class="felidaeLogo" src=\'https://storage.googleapis.com/ff-sightingsreport.appspot.com/felidae-notification-logo.png\' alt=\'felidae-logo\' style="width: 250px;display: block;margin-left: auto;margin-right: auto;"> \
            </div> \
            <div class="content" style="display: block;margin-left: auto;margin-right: auto;padding: 20px 20px 20px 20px;width:80%;text-align: center;background-color:white;border: 1px solid #E2E2E2;border-radius: 10px;"> \
                <div> \
                    <span>Thank you for registering your email address.</span> \
                    <br /> \
                    <br /> \
                    <span>Your report has been sent to the Felidae Fund Team.</span> \
                </div> \
            </div> \
            <div class="footer" style="display: block;margin-left: auto;margin-right: auto;color: grey;padding: 30px 0 0 0;font-size: 0.8em;text-align: center;"> \
                <span>Felidae Conservation Fund | 110 Tiburon Blvd., Suite 3 | Mill Valley, CA 94941 | United States</span> \
            </div> \
        </div> \
    </div> \
</body> \
</html>'

var sendEmail = (email) => {
    return new Promise((resolve,reject)=> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: 'Puma Report <pumareport@refreshlabs.co>',
            subject: 'Thank you for the report',
            html: emailBody
        };
        sgMail.send(msg);
        resolve(msg)
    }).catch((err) => {
        reject(err)
    })
}

module.exports = sendEmail