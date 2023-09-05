const House = require("../models/House");
const Tenant = require("../models/Tenant");

const getHostelAndTenantCount = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        const hostels = await House.find();

        let hostelAndTenantCounts

        const tenantsCount = tenants.length;
        const hostelsCount = hostels.length;

        hostelAndTenantCounts = { tenantsCount, hostelsCount }

        return res.status(200).json(hostelAndTenantCounts);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = {
    getHostelAndTenantCount
}