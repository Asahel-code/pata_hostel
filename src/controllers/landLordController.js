const LandLordDetails = require('../models/LandLordDetails');

const fetchAllLandLord = async (req, res) => {
    try {
        const landlords = await LandLordDetails.find().populate('user', 'username');

        return res.status(200).json(landlords);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const checkLandlord = async (req, res) => {
    try {
        const landlord = await LandLordDetails.findOne({ user: req.userId });

        if (landlord) {
            if(landlord.subScriptionDueDate < new Date()){
                return res.status(200).json({ message: "Subscription due" });
            }
            else{
                return res.status(200).json({ message: "Ok" });
            }
        }
        else {
            return res.status(200).json({ message: "Doesn't exist" });
        }

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const fetchLandLordDetails = async (req, res) => {
    try {
        return res.status(200).json(res.landlord);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const addLandLordDetails = async (req, res) => {
    const { body } = req;

    const newLandLordDetails = new LandLordDetails({
        firstname: body?.firstname,
        lastname: body?.lastname,
        whatsappNumber: body?.whatsappNumber,
        user: req.userId,
        paymentPayBillNumber: body?.paymentPayBillNumber,
        accountName: body?.accountName,
        termsAndCondition: body?.termsAndCondition,
        subScriptionfee: body?.subScriptionfee,
    })

    try {
        await newLandLordDetails.save();

        return res.status(201).json({ message: `${body?.firstname} ${body?.lastname}, your details has been added successfully` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const updateLandLordDetails = async (req, res) => {
    const { body } = req;

    res.landlord.firstname = body?.firstname;
    res.landlord.lastname = body?.lastname;
    res.landlord.whatsappNumber = body?.whatsappNumber;
    res.landlord.paymentPayBillNumber = body?.paymentPayBillNumber;
    res.landlord.accountName = body?.accountName;
    res.landlord.termsAndCondition = body?.termsAndCondition;

    try {
        await res.landlord.save();

        return res.status(200).json({ message: `${body?.firstname} ${body?.lastname}, your details has been updated successfully` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const payforSubscription = async (req, res) => {
    const { body } = req;

    const currentDate = new Date();
    const monthDays = 30;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const dueDate = currentDate.getTime() + (monthDays * millisecondsPerDay);
    const fomartedDueDate = new Date(dueDate);

    res.landlord.isSubscribed = true;
    res.landlord.subScriptionDueDate = fomartedDueDate;
    res.landlord.paymentResult = body.paymentResult;
    res.landlord.subscribedAt = Date.now();

    try {
        await res.landlord.save();

        return res.status(200).json({ message: `${res.landlord.firstname} ${res.landlord.lastname}, your have successfully subscribed` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = {
    fetchAllLandLord,
    checkLandlord,
    fetchLandLordDetails,
    addLandLordDetails,
    updateLandLordDetails,
    payforSubscription
}