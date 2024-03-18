import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import CustomModal from "../components/general/CustomModal";
import { Box, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import CustomInput from "../components/general/CustomInput";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";
import LandLordServices from "../utils/services/LandLordServices";
import PreNumberFormart from "../components/general/PreNumberFormart";
import { useSpecificLandLordAdmin } from "../hooks/useLandlord";

const UpdateLandLordModal = ({ handleOpen, handleClose, landLordId }) => {

    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        whatsappNumber: "",
        paymentPayBillNumber: "",
        accountName: "",
        termsAndCondition: "",
    });

    const { stateLoading, landlord } = useSpecificLandLordAdmin(landLordId);


    useEffect(() => {
        if(!stateLoading){
            setState((prev) => ({
                ...prev,
                firstname: landlord?.firstname,
                lastname: landlord?.lastname,
                whatsappNumber: landlord?.whatsappNumber,
                paymentPayBillNumber: landlord?.paymentPayBillNumber,
                accountName: landlord?.accountName,
                termsAndCondition: landlord?.termsAndCondition,
            }));
        }
        
    }, [stateLoading, landlord]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleValidation = () => {
        if (state.firstname === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your first name",
                status: "error",
            })
            return false;
        }
        else if (state.lastname === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your last name",
                status: "error",
            })
            return false;
        }
        else if (state.whatsappNumber === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your whatsapp number",
                status: "error",
            })
            return false;
        }
        else if (state.whatsappNumber.length < 9 || state.whatsappNumber.length > 9) {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please make sure your whatsapp number has been formated this way 722000000",
                status: "error",
            })
            return false;
        }
        else if (state.paymentPayBillNumber === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your paybill number",
                status: "error",
            })
            return false;
        }
        else if (state.accountName === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your account name",
                status: "error",
            })
            return false;
        }
        else if (state.termsAndCondition === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your terms and conditions",
                status: "error",
            })
            return false;
        }


        return true;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);

        const isValid = handleValidation();

        if (!isValid) return;

        try {
            await LandLordServices.adminUpdateLandLordDetails(state, landlord?._id).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response.message,
                    status: "success"
                })
                setLoading(false);
                handleClose();
                window.location.reload();
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error"
            })
            setLoading(false);
        }
    }

    return (
        <CustomModal
            isOpen={handleOpen}
            onClose={handleClose}
            title="Update Landlord"
            showUpdate={true}
            handleUpdate={handleUpdate}
            loadingSave={loading}
        >
            <div>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>First name</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"First name"}
                            handleChange={handleChange}
                            name={"firstname"}
                            type={"text"}
                            value={state?.firstname}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Last name</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Last name"}
                            handleChange={handleChange}
                            name={"lastname"}
                            type={"text"}
                            value={state?.lastname}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Whatsapp number</FormLabel>
                        <CustomInput
                            width="full"
                            icon={<PreNumberFormart />}
                            placeholder={"720000000"}
                            handleChange={handleChange}
                            name={"whatsappNumber"}
                            type={"number"}
                            value={state?.whatsappNumber}
                        />
                    </FormControl>
                </Box>
                <Box className="flex  flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Payment paybill number</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"063599"}
                            handleChange={handleChange}
                            name={"paymentPayBillNumber"}
                            type={"number"}
                            value={state?.paymentPayBillNumber}
                        />
                    </FormControl>
                </Box>
                <Box className="flex  flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Account name</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Account name"}
                            handleChange={handleChange}
                            name={"accountName"}
                            value={state?.accountName}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Terms & Condition</FormLabel>
                        <Textarea
                            onChange={handleChange}
                            placeholder='Terms & Condition'
                            name={"termsAndCondition"}
                            focusBorderColor={"#05A3FF"}
                            borderColor={"#05A3FF"}
                            value={state?.termsAndCondition}
                        />
                    </FormControl>
                </Box>

            </div>
        </CustomModal>
    )
}

UpdateLandLordModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    landLordId: PropTypes.object.isRequired
}

export default UpdateLandLordModal