import AxiosUtility, { setAuthToken } from "./AxiosServices";

const fetchLandLordBookings = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get("/tenant/");

    return res.data;
}
const bookHouse = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.post("/tenant/", data);

    return res.data;
}

const fetchBooking = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/tenant/${id}`);

    return res.data;
}


const fetchUserBookings = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/tenant/mine`);

    return res.data;
}

const makePayment = async (id, data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/tenant/${id}/pay`, data);

    return res.data;
}

const approvePayment = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.patch(`/tenant/${id}/approve/pay`);

    return res.data;
}

const checkRoomSpaceAvailability = async (roomNo, numberPerRoom) => {
    const res = await AxiosUtility.get(`/tenant/check/check_space_availability/${roomNo}&${numberPerRoom}`);

    return res.data;
}

const checkIfTenantHasBookedBefore = async () => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get('/tenant/check/check_if_tenant_has_booked_before');

    return res.data;
}

const deleteBooking = async (id) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.delete(`/tenant/${id}`);

    return res.data;
}

const BookingServices = {
    fetchLandLordBookings,
    bookHouse,
    fetchBooking,
    fetchUserBookings,
    makePayment,
    approvePayment,
    checkRoomSpaceAvailability,
    checkIfTenantHasBookedBefore,
    deleteBooking
}

export default BookingServices;