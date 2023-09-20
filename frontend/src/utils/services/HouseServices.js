import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchHouses = async () => {
    const res = await AxiosUtility.get("/house/");

    return res.data;
}

const fetchLandLordHouses = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/house/landlord_houses");

    return res.data;
}

const fetchHouse = async (slug) => {
    const res = await AxiosUtility.get(`/house/${slug}`);

    return res.data;
}

const addHouse = async (formData) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/house/", formData);

    return res.data;
}

const searchHouse = async (data) => {
    const res = await AxiosUtility.get(`/house/search/${data.gender}&${data.location}&${data.minPrice}&${data.maxPrice}`, data);

    return res.data;
}

const updateHouse = async (data, slug) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/house/${slug}`, data);

    return res.data;
}

const updateImagesHouse = async (formData, slug) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/house/update_images/${slug}`, formData);

    return res.data;
}

const deleteHouse = async (slug) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.delete(`/house/${slug}`);

    return res.data;
}

const HouseServices = {
    fetchHouses,
    fetchLandLordHouses,
    fetchHouse,
    searchHouse,
    addHouse,
    updateHouse,
    updateImagesHouse,
    deleteHouse
}

export default HouseServices;