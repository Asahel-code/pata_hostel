const Region = require('../models/Region');

const fetchAllRegions = async (req, res) => {
    try {
        const regions = await Region.find();

        return res.status(200).json(regions);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const fetchRegion = async (req, res) => {
    try {
        return res.status(200).json(res.region);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const addRegion = async (req, res) => {

    const { body } = req;

    const newRegion = new Region({
        name: body?.name
    });

    try {
        await newRegion.save();

        return res.status(201).json({ message: `${body?.name} has been added successfully` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const updateRegion = async (req, res) => {

    const { body } = req;

    res.region.name = body?.name;

    try {
        await res.region.save();

        return res.status(200).json({ message: `${body?.name} has been updated successfully` });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const deleteRegion = async (req, res) => {
    try {
        await res.region.remove();

        return res.status(200).json({ message: "Region deleted" });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = {
    fetchAllRegions,
    fetchRegion,
    addRegion,
    updateRegion,
    deleteRegion
}