const Tenant = require("../models/Tenant");
const LandLordDetails = require("../models/LandLordDetails");
const House = require("../models/House");

const getTenant = async (req, res, next) => {
    const {
        params: { tenantId },
    } = req;

    let tenantWithLandlordDetailsAndHoseDetails

    if (!tenantId) {
        res.status(400).json({ message: "Parameter tenant id can not be empty" });
    }

    try {
        const tenant = await Tenant.findOne({ _id: tenantId }).populate('user', 'username');
        if (tenant === null) return res.status(404).json({ message: "This tenant is not available" })

        const landLord = await LandLordDetails.findOne({ user: tenant.house.landlord });

        const hostel = await House.findOne({ _id: tenant.house.hostel });

        tenantWithLandlordDetailsAndHoseDetails = { tenant, hostel, landLord }
    }
    catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || error });
    }

    res.tenant = tenantWithLandlordDetailsAndHoseDetails;
    next()
}

module.exports = getTenant;