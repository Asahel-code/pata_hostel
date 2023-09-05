const LandLordDetails = require("../models/LandLordDetails");

const getLandLord = async (req, res, next) => {
 
    let landlord;

    try {
        landlord = await LandLordDetails.findOne({user: req.userId});
        if (landlord === null) return res.status(404).json({ message: "This landlord is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.landlord = landlord;
    next()
}

module.exports = getLandLord;