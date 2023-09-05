import AxiosUtility, { setAuthToken } from "./AxiosServices";

const mpesaPayments = async (data) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/payment/mpesa/stkpush/${data.phoneNumber}&${data.amount}&${data.businessCode}&${data.account}`);

    return res.data;
}

const queryMpesaPayments = async (checkoutRequestID, businessCode) => {
    setAuthToken(AxiosUtility);
    const res = await AxiosUtility.get(`/payment/mpesa/stkpush/query/${checkoutRequestID}&${businessCode}`);

    return res.data;
}

const PaymentServices = {
    mpesaPayments,
    queryMpesaPayments
}

export default PaymentServices;