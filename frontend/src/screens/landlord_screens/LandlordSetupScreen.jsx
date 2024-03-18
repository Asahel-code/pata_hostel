import UserLayout from "../../components/UserLayout";
import Helmet from "../../components/general/Helemet";
import { useState, useEffect } from "react";
import img1 from "../../assets/images/hostel_img1.jpg";
import { Box, Center, FormControl, FormLabel, Text, Textarea, useToast } from "@chakra-ui/react";
import CustomInput from "../../components/general/CustomInput";
import CustomButton from "../../components/general/CustomButton";
import LoadingButton from "../../components/general/LoadingButton";
import { toastProps } from "../../utils/toastProps";
import { useNavigate } from "react-router-dom";
import LandLordServices from "../../utils/services/LandLordServices";
import { getError } from "../../utils/getError";
import PreNumberFormart from "../../components/general/PreNumberFormart";

export const LandlordSetupScreen = () => {
    const toast = useToast();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        whatsappNumber: "",
        paymentPayBillNumber: "",
        accountName: "",
        termsAndCondition: "",
        subScriptionfee: 1,
    });

    useEffect(() => {
        try {
            LandLordServices.checkLandlord().then((response) => {
                if (response.message == "Ok") {
                    navigate('/')
                }
                else if (response.message == "Subscription due") {
                    navigate('/landlord/profile')
                }
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            })
        }
    }, [navigate, toast]);

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

    const handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = handleValidation();

        if (!isValid) return;

        try {
            await LandLordServices.addLandLordDetails(state).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response.message,
                    status: "success",
                })
                setLoading(false);
                navigate('/landlord/profile');
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Success",
                description: getError(error),
                status: "success",
            })
            setLoading(false);
        }
    }

    return (
        <UserLayout>
            <Helmet title="Profile">
                <div className="relative">
                    <div className="w-full h-[350px]">
                        <img src={img1} alt="sample" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute top-[40%] inset-x-80" data-aos="fade-up">
                        <div className="text-center">
                            <Text className="text-white font-bold text-5xl">
                                Welcome to Pata Hostel
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="mt-12 mx-10 md:mx-20">
                    <div className="my-12">
                        <Center>
                            <form onSubmit={handleSubmit} className="w-3/4">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xl font-semibold">Setup your account</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Box className="flex flex-col gap-1 w-full">
                                        <FormControl my={2} isRequired>
                                            <FormLabel>First name</FormLabel>
                                            <CustomInput
                                                width="full"
                                                placeholder={"First name"}
                                                handleChange={handleChange}
                                                name={"firstname"}
                                                type={"text"}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box className="flex  flex-col gap-1 w-full">
                                        <FormControl my={2} isRequired>
                                            <FormLabel>Last name</FormLabel>
                                            <CustomInput
                                                width="full"
                                                placeholder={"Last name"}
                                                handleChange={handleChange}
                                                name={"lastname"}
                                                type={"text"}
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                <Box className="flex  flex-col gap-1 w-full">
                                    <FormControl my={2} isRequired>
                                        <FormLabel>Whatsapp number</FormLabel>
                                        <CustomInput
                                            width="full"
                                            icon={<PreNumberFormart />}
                                            placeholder={"720000000"}
                                            handleChange={handleChange}
                                            name={"whatsappNumber"}
                                            type={"number"}
                                        />
                                    </FormControl>
                                </Box>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Box className="flex  flex-col gap-1 w-full">
                                        <FormControl my={2} isRequired>
                                            <FormLabel>Payment paybill number</FormLabel>
                                            <CustomInput
                                                width="full"
                                                placeholder={"063599"}
                                                handleChange={handleChange}
                                                name={"paymentPayBillNumber"}
                                                type={"number"}
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
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                <Box className="flex  flex-col gap-1 w-full">
                                    <FormControl my={2} isRequired>
                                        <FormLabel>Your terms and conditions</FormLabel>
                                        <Textarea
                                            placeholder={"Your terms and conditions"}
                                            onChange={handleChange}
                                            name={"termsAndCondition"}
                                            focusBorderColor={"#05A3FF"}
                                            borderColor={"#05A3FF"}
                                        />
                                    </FormControl>
                                </Box>
                                <Box className="my-3 bg-primary_color_light p-3">
                                    <Text fontSize={"lg"}>
                                        By submiting this form you agree to pay a monthly subscription fee of <span className="font-bold">KES. 1</span>
                                    </Text>

                                </Box>
                                <Box className="my-3 flex justify-end">
                                    {loading ?
                                        <LoadingButton />
                                        :
                                        <CustomButton
                                            type={"submit"}
                                            variant={"solid"}
                                            width={"250px"}
                                        >
                                            Submit
                                        </CustomButton>
                                    }
                                </Box>
                            </form>
                        </Center>
                    </div>
                </div>
            </Helmet>
        </UserLayout>
    )
}

