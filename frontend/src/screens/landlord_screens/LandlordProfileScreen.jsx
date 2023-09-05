import UserLayout from "../../components/UserLayout";
import Helmet from "../../components/general/Helemet";
import { useState, useEffect } from "react";
import { Box, Center, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import CustomInput from "../../components/general/CustomInput";
import CustomButton from "../../components/general/CustomButton";
import LoadingButton from "../../components/general/LoadingButton";
import { toastProps } from "../../utils/toastProps";
import mpesaLogo from "../../assets/images/mpesa_logo.png";
import ActionButton from "../../components/general/ActionButton";
import { FiEdit } from "react-icons/fi";
import numberWithCommas from "../../utils/numberWithCommas";
import { useSpecificLandLord } from "../../hooks/useLandlord";
import Loader from "../../components/general/Loader";
import LandLordServices from "../../utils/services/LandLordServices";
import { getError } from "../../utils/getError";
import PaymentServices from "../../utils/services/PaymentServices";
import { BsCheck2Circle } from "react-icons/bs";
import { convertDateTimeFormart } from "../../utils/timeFormat";


export const LandlordProfileScreen = () => {

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentNumber, setPaymentNumber] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        whatsappNumber: "",
        paymentPayBillNumber: "",
        accountName: "",
        termsAndCondition: ""
    });

    const { stateLoading, landlord } = useSpecificLandLord();
    console.log(landlord)

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            firstname: landlord?.firstname,
            lastname: landlord?.lastname,
            whatsappNumber: landlord?.whatsappNumber,
            paymentPayBillNumber: landlord?.paymentPayBillNumber,
            accountName: landlord?.accountName,
            termsAndCondition: landlord?.termsAndCondition
        }))
    }, [landlord])

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

    const handleInputView = () => {
        setIsDisabled((prev) => !prev);
    }

    const handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = handleValidation();

        if (!isValid) return;

        try {
            await LandLordServices.updateLandLordDetails(state).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response?.message,
                    status: "success",
                })
                setLoading(false);
                setIsDisabled(true);
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            })
            setLoading(false);
        }
    }

    const handlePayment = async () => {

        if (paymentNumber === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your payment number",
                status: "error",
            })
            return;
        }
        else if (paymentNumber.length < 9 || paymentNumber.length > 9) {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please make sure your payment number number has been formated this way 722000000",
                status: "error",
            })
            return;
        }

        setPaymentLoading(true);

        const data = {
            phoneNumber: "254".concat(paymentNumber),
            amount: landlord?.subScriptionfee,
            businessCode: "174379",
            account: "Pata Hostel ltd"
        }

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            await PaymentServices.mpesaPayments(data).then(async (response) => {
                if (response.errorCode) {
                    toast({
                        ...toastProps,
                        title: "Error!",
                        description: response.errorMessage,
                        status: "error",
                    });
                    setPaymentLoading(false);
                }
                else if (response.ResponseCode) {
                    await delay(15000);
                    try {
                        await PaymentServices.queryMpesaPayments(response.CheckoutRequestID, data.businessCode).then(async (response) => {
                            if (response.ResultCode == "0") {
                                const paymentResult = response;
                                try {
                                    await LandLordServices.payForSubscription({ paymentResult }).then((response) => {
                                        toast({
                                            ...toastProps,
                                            title: "Success",
                                            description: response.message,
                                            status: "success",
                                        });
                                        setPaymentLoading(false);
                                        window.location.reload();
                                    })
                                } catch (error) {
                                    toast({
                                        ...toastProps,
                                        title: "Error!",
                                        description: getError(error),
                                        status: "error",
                                    });
                                    setPaymentLoading(false);
                                }
                            }
                            else {
                                toast({
                                    ...toastProps,
                                    title: "Error!",
                                    description: "Payment wasn't processed successfully please try again",
                                    status: "error",
                                });
                                setPaymentLoading(false);
                            }
                        })
                    } catch (error) {
                        toast({
                            ...toastProps,
                            title: "Error!",
                            description: getError(error),
                            status: "error",
                        });
                        setPaymentLoading(false);
                    }
                }
                setPaymentLoading(false);
            })
        } catch (error) {
            setLoading(false)
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            });
        }
    }

    return (
        <UserLayout>
            <Helmet title="Profile">
                <div className="mt-24 mx-10 md:mx-20">
                    <div className="my-12">
                        {stateLoading ? (
                            <Center>
                                <Loader />
                            </Center>
                        ) : (
                            <div className="flex gap-5">
                                <div className="w-3/4">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-xl font-semibold">Your Information</p>
                                        <ActionButton handleClick={handleInputView}>
                                            <FiEdit />
                                        </ActionButton>
                                    </div>
                                    <form onSubmit={handleUpdate}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Box className="flex flex-col gap-1 w-full">
                                                <FormControl my={2} isRequired>
                                                    <FormLabel>First name</FormLabel>
                                                    <CustomInput
                                                        width="full"
                                                        placeholder={"First name"}
                                                        handleChange={handleChange}
                                                        name={"firstname"}
                                                        value={state.firstname}
                                                        type={"text"}
                                                        isDisabled={isDisabled}
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
                                                        value={state.lastname}
                                                        type={"text"}
                                                        isDisabled={isDisabled}
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
                                                    value={state.whatsappNumber}
                                                    type={"number"}
                                                    isDisabled={isDisabled}
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
                                                        value={state.paymentPayBillNumber}
                                                        type={"number"}
                                                        isDisabled={isDisabled}
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
                                                        value={state.accountName}
                                                        name={"accountName"}
                                                        isDisabled={isDisabled}
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
                                                    value={state.termsAndCondition}
                                                    focusBorderColor={"#05A3FF"}
                                                    borderColor={"#05A3FF"}
                                                    isDisabled={isDisabled}
                                                />
                                            </FormControl>
                                        </Box>
                                        {!isDisabled && (
                                            <Box className="my-3 flex justify-end">
                                                {loading ?
                                                    <LoadingButton />
                                                    :
                                                    <CustomButton
                                                        type={"submit"}
                                                        variant={"solid"}
                                                        width={"250px"}
                                                    >
                                                        Update
                                                    </CustomButton>
                                                }
                                            </Box>
                                        )}
                                    </form>
                                </div>

                                <div className="w-1/4 border border-primary_color rounded-lg h-fit">
                                    <div className="text-center py-3">
                                        <p className="font-semibold text-xl">Payment details</p>
                                    </div>
                                    {landlord?.isSubscribed ? (
                                        landlord?.subScriptionDueDate >= Date.now() ? (
                                            <div className="mx-4">
                                                <div className="flex justify-between items-center text-lg">
                                                    <p>Subscription fee:</p>
                                                    <p className="font-semibold">KES. {numberWithCommas(landlord?.subScriptionfee)}</p>
                                                </div>


                                                <div className="mt-4 flex flex-col gap-2">
                                                    <p className="font-semibold text-md">Payment option:</p>
                                                    <img src={mpesaLogo} alt="Mpesa" className="w-44 h-8" />
                                                </div>

                                                <Box className="flex flex-col gap-1 w-full">
                                                    <FormControl my={2} isRequired>
                                                        <FormLabel>Payment number</FormLabel>
                                                        <CustomInput
                                                            width="full"
                                                            icon={<PreNumberFormart />}
                                                            placeholder={"720000000"}
                                                            handleChange={(e) => setPaymentNumber(e.target.value)}
                                                            name={"paymentNumber"}
                                                            type={"number"}
                                                        />
                                                    </FormControl>
                                                </Box>
                                                <Box className="my-3 flex justify-end">
                                                    {paymentLoading ?
                                                        <LoadingButton />
                                                        :
                                                        <CustomButton
                                                            handleClick={handlePayment}
                                                            variant={"solid"}
                                                            width={"250px"}
                                                        >
                                                            Pay
                                                        </CustomButton>
                                                    }
                                                </Box>
                                            </div>
                                        ) : (
                                            <div className="mx-4 h-44">
                                                <Center>
                                                    <div className="text-center">
                                                        <Center>
                                                            <BsCheck2Circle className="text-primary_green text-4xl" />
                                                        </Center>
                                                        <p className="mt-5 text-2xl">Active</p>
                                                        <p className="mt-8"><span className="font-semibold">Due Date: </span>{convertDateTimeFormart(landlord?.subScriptionDueDate)}</p>
                                                    </div>
                                                </Center>
                                            </div>
                                        )
                                    ) : (
                                        <div className="mx-4">
                                            <div className="flex justify-between items-center text-lg">
                                                <p>Subscription fee:</p>
                                                <p className="font-semibold">KES. {numberWithCommas(landlord?.subScriptionfee)}</p>
                                            </div>


                                            <div className="mt-4 flex flex-col gap-2">
                                                <p className="font-semibold text-md">Payment option:</p>
                                                <img src={mpesaLogo} alt="Mpesa" className="w-44 h-8" />
                                            </div>

                                            <Box className="flex flex-col gap-1 w-full">
                                                <FormControl my={2} isRequired>
                                                    <FormLabel>Payment number</FormLabel>
                                                    <CustomInput
                                                        width="full"
                                                        icon={<PreNumberFormart />}
                                                        placeholder={"720000000"}
                                                        handleChange={(e) => setPaymentNumber(e.target.value)}
                                                        name={"paymentNumber"}
                                                        type={"number"}
                                                    />
                                                </FormControl>
                                            </Box>
                                            <Box className="my-3 flex justify-end">
                                                {paymentLoading ?
                                                    <LoadingButton />
                                                    :
                                                    <CustomButton
                                                        handleClick={handlePayment}
                                                        variant={"solid"}
                                                        width={"250px"}
                                                    >
                                                        Pay
                                                    </CustomButton>
                                                }
                                            </Box>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Helmet>
        </UserLayout>
    )
}

const PreNumberFormart = () => (
    <div className="bg-[#EEEEEE] h-10 px-5 flex items-center">
        <span>+254</span>
    </div>
)

