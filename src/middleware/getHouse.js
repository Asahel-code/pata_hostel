const House = require("../models/House");
const LandLordDetails = require("../models/LandLordDetails");

const getHouse = async (req, res, next) => {
    const {
        params: { houseSlug },
    } = req;

    let houseWithLandlordDetails 

    if (!houseSlug) {
        res.status(400).json({ "message": "Parameter house slug can not be empty" });
    }

    try {
        const house = await House.findOne({ slug: houseSlug }).populate('region', 'name');
        if (house === null) return res.status(404).json({ message: "This house is not available" })

        const landLord = await LandLordDetails.findOne({ user: house.landlord });

        houseWithLandlordDetails = { house, landLord }
    }

    catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || error });
    }

    res.house = houseWithLandlordDetails;
    next()
}

module.exports = getHouse;