import AxiosUtility from "./AxiosServices";

const sendMessage = async (data) => {
    const res = await AxiosUtility.post('/contact/', data);

    return res.data;
}

const ContactServices = {
    sendMessage
}

export default ContactServices;