require('dotenv').config();
const AxiosUtility = require('../../utils/axiosUtility');

const performPayment = async (req, res) => {
    // get phone number, amount, businessCode and account from url params
    const { phoneNumber } = req.params
    const { amount } = req.params
    const { businessCode } = req.params
    const { account } = req.params



    let url = "/mpesa/stkpush/v1/processrequest"
    let auth = "Bearer " + req.access_token


    const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, -3);
    const password = new Buffer.from(businessCode + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

    const data = {
        BusinessShortCode: businessCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: businessCode,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.APP_URL}/api/v1/payment/mpesa/stkpush/result/`,
        AccountReference: account,
        TransactionDesc: "Test"
    }

    await AxiosUtility.post(url,
        data, {
        headers: {
            Authorization: auth
        },
    })
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const querySTKPayment = async (req, res) => {

    const { checkoutRequestID } = req.params
    const { businessCode } = req.params

    let url = "/mpesa/stkpushquery/v1/query";
    let auth = "Bearer " + req.access_token;


    const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, -3);
    const password = new Buffer.from(businessCode + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

    const data = {
        BusinessShortCode: businessCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID,
    }


    await AxiosUtility.post(url,
        data, {
        headers: {
            Authorization: auth
        },
    })
        .then((response) => {
            return res.status(200).json(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
}

const getTransctionsResults = (req, res, next) => {
    if (req.method === "POST") {
        const data = req.body;

        return res.status(200).json(data.Body.stkCallback);
    }
}

module.exports = {
    performPayment,
    querySTKPayment,
    getTransctionsResults
}