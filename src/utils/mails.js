require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { convertDateTimeFormart } = require('./timeFormat');


const generateOTP = () => {
    let otp = crypto.randomBytes(4).toString('hex');
    return otp;
}

const gmailTransport = () => nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE_NAME,
    host: process.env.GMAIL_SERVICE_HOST,
    secure: process.env.GMAIL_SERVICE_SECURE,
    port: process.env.GMAIL_SERVICE_PORT,
    auth: {
        user: process.env.GMAIL_USER_NAME,
        pass: process.env.GMAIL_USER_PASSWORD
    }
});


const verifyAccountEmailTemplate = (otp) => {
    return `<h2>Verify your account</h2>
    <hr/>
    <p>Your OTP is:</p>
    <h3>${otp}</h3>
    <p>Expires in: 1 hour</p> 
    `;
};

const fogortPasswordEmailTemplate = (otp) => {
    return `<h2>Forgot password</h2>
    <hr/>
    <p>Your currrent password is:</p>
    <h3>${otp}</h3>
    <p>Expires in: 1 hour</p> 
    `;
};

const paymentEmailTemplate = (tenant) => {
    return `
    <p>
    Hi ${tenant.tenant.user.username},</p>
    <p>We have recieved your payment successfully for ${tenant.hostel.name}.</p>
    <p>Please wait as your payment is it a approved for you to get access to room no ${tenant, tenant.roomNo}.</p>
    <hr/>
    <p>
    By Pata Hostel.
    </p>
    `;
};

const paymentApprovedEmailTemplate = (tenant) => {
    return `
    <p>
    Hi ${tenant.tenant.user.username},</p>
    <p>Your payment has been approved for ${tenant.hostel.name}.</p>
    <p>
        Room no ${tenant.tenant.roomNo} will be opened to you please ensure report soon, 
        you stay will be due on ${convertDateTimeFormart(tenant.tenant.paymentDueDate)}.
    </p>
    <hr/>
    <p>
    By Pata Hostel.
    </p>
    `;
};

const contactUsEmailTemplate = (body) => {
    return `<h2>${body.subject}</h2>
    <hr/>
    <p>${body.name},</p>
    <p>has send you a message, here are the details:</p>
    <br/>

    <p>${body.contactMessage}</p>
    <hr/>
    `;
};

module.exports = {
    generateOTP,
    gmailTransport,
    verifyAccountEmailTemplate,
    paymentEmailTemplate,
    paymentApprovedEmailTemplate,
    fogortPasswordEmailTemplate,
    contactUsEmailTemplate
}