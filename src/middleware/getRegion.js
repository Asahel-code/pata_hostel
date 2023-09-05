const Region = require("../models/Region");

const getRegion = async (req, res, next) => {
    const {
        params: { regionId },
    } = req;

    let region

    if (!regionId) {
        res.status(400).json({message: "Parameter region id can not be empty" });
    }

    try {
        region = await Region.findOne({_id: regionId});
        if (region === null) return res.status(404).json({ message: "This region is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.region = region;
    next()
}

module.exports = getRegion;