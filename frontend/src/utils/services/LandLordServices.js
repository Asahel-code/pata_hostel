import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchAllLandLord = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/landlord/");
  
    return res.data;
}

const checkLandlord = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/landlord/check");
  
    return res.data;
}

const fetchLandLordDetails = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get('/landlord/profile');

    console.log(res)
    return res.data;
}

const addLandLordDetails = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post('/landlord/', data);

    return res.data;
}

const updateLandLordDetails = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch('/landlord/', data);

    return res.data;
}

const payForSubscription = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch('/landlord/pay_subcription', data);

    return res.data;
}


const LandLordServices = {
    fetchAllLandLord,
    checkLandlord,
    addLandLordDetails,
    fetchLandLordDetails,
    updateLandLordDetails,
    payForSubscription
}

export default LandLordServices;