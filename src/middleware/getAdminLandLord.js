const LandLordDetails = require("../models/LandLordDetails");

const getAdminLandLord = async (req, res, next) => {

    const {
        params: { landlordId },
    } = req;
 
    let landlord;

    if (!landlordId) {
        res.status(400).json({ "message": "Parameter landlordId can not be empty" });
    }
    

    try {
        landlord = await LandLordDetails.findOne({_id: landlordId});
        if (landlord === null) return res.status(404).json({ message: "This landlord is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.landlord = landlord;
    next()
}

module.exports = getAdminLandLord;