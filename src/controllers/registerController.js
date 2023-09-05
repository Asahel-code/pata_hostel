require('dotenv').config();
const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const bcrypt = require('bcrypt');
const { validateRegisterUser } = require('../utils/errorHandler');
const { generateOTP, gmailTransport, verifyAccountEmailTemplate } = require("../utils/mails");

const handleNewUser = async (req, res) => {
    const { body } = req;
    const { error } = validateRegisterUser(body);

    //if valid, return 400 - Bad request
    if (error) return res.status(400).json({ message: error.details[0].message });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: body.email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(body.password, 10);

        //create and store the new user
        const newUser = new User({
            username: body.name,
            email: body.email,
            password: hashedPwd,
        });

        OTP = generateOTP()

        const verificationToken = new VerificationToken({
            owner: newUser._id,
            token: OTP
        });

        await verificationToken.save();
        await newUser.save();

        gmailTransport().sendMail({
            from: process.env.GMAIL_USER_NAME,
            to: newUser.email,
            subject: "Verify your account",
            html: verifyAccountEmailTemplate(OTP)
        },
            (error, body) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(body);
                }
            }
        );

        res.status(201).json({ message: `New user ${body.name} created!, Please login and verify your account an email has been sent to you` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const handleNewLandLord = async (req, res) => {
    const { body } = req;
    const { error } = validateRegisterUser(body);

    //if valid, return 400 - Bad request
    if (error) return res.status(400).json(error.details[0].message);

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: body.email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(body.password, 10);

        //create and store the new user
        const newUser = new User({
            username: body.name,
            email: body.email,
            password: hashedPwd,
            isLandLord: true,
        });

        OTP = generateOTP()

        const verificationToken = new VerificationToken({
            owner: newUser._id,
            token: OTP
        });

        await verificationToken.save();
        await newUser.save();

        gmailTransport().sendMail({
            from: process.env.GMAIL_USER_NAME,
            to: newUser.email,
            subject: "Verify your account",
            html: verifyAccountEmailTemplate(OTP)
        });

        res.status(201).json({ message: `New user ${body.name} created!, Please login and verify your account an email has been sent to you` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}



module.exports = { handleNewUser, handleNewLandLord };