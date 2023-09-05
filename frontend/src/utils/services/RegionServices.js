import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchRegions = async () => {
    const res = await AxiosUtility.get("/region/");

    return res.data;
}

const fetchRegion = async (id) => {
    const res = await AxiosUtility.get(`/region/${id}`);

    return res.data;
}

const addRegion = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/region/", data);

    return res.data;
}

const updateRegion = async (data, id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/region/${id}`, data);

    return res.data;
}

const deleteRegion = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.delete(`/region/${id}`);

    return res.data;
}

const RegionServices = {
    fetchRegions,
    fetchRegion,
    addRegion,
    updateRegion,
    deleteRegion
}

export default RegionServices;