import AxiosUtility from "./AxiosServices";

const fetchTenantAndHostelCount = async () => {
    const res = await AxiosUtility.get('/count/tenant_and_hostel_count');

    return res.data;
}

const CountServices = {
    fetchTenantAndHostelCount
}

export default CountServices;