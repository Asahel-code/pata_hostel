require('dotenv').config();
const { gmailTransport, contactUsEmailTemplate } = require("../utils/mails");
const { validateContact } = require('../utils/errorHandler');

const handleContact = async (req, res,) => {
    const { body } = req;
    const { error } = validateContact(body);

    //if valid, return 400 - Bad request
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        gmailTransport().sendMail({
            from: process.env.GMAIL_USER_NAME,
            to: process.env.GMAIL_USER_NAME,
            subject: `Recieved a message from ${body.name} through book store`,
            html: contactUsEmailTemplate(body)
        },
            (error, body) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(body);
                }
            }
        );

        return res.status(200).json({ message: "Message has been sent successfully" });
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = { handleContact };