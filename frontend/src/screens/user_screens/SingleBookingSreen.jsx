import UserLayout from "../../components/UserLayout";
import LoadingButton from "../../components/general/LoadingButton";
import CustomButton from "../../components/general/CustomButton";
import Helmet from "../../components/general/Helemet";
import mpesaLogo from "../../assets/images/mpesa_logo.png";
import { Box, Center, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import CustomInput from "../../components/general/CustomInput";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTenant } from "../../hooks/useTenant";
import Loader from "../../components/general/Loader";
import { convertDateTimeFormart } from "../../utils/timeFormat";
import { BsCheck2Circle } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { toastProps } from "../../utils/toastProps";
import BookingServices from "../../utils/services/BookingServices";
import PaymentServices from "../../utils/services/PaymentServices";
import { getError } from "../../utils/getError";

export const SingleBookingSreen = () => {

    let { id } = useParams();

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        months: 0,
        paymentNumber: ""
    });

    const { stateLoading, booking } = useTenant(id);

    console.log(booking);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    }

    const handleValidation = () => {
        if (state.months === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input the number of months you would like to stay in this hostel",
                status: "error",
            })
            return false;
        }
        else if (state.paymentNumber === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input your payment number",
                status: "error",
            })
            return false;
        }
        else if (state.paymentNumber.length < 9 || state.paymentNumber.length > 9) {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please make sure your payment number number has been formated this way 722000000",
                status: "error",
            })
            return false;
        }

        return true;
    }

    const data = {
        phoneNumber: "254".concat(state.paymentNumber),
        amount: parseInt(booking?.hostel?.rentalFee) * parseInt(state.months),
        businessCode: booking?.landLord?.paymentPayBillNumber,
        account: booking?.landLord?.accountName,
    }

    const handlePayment = async () => {
        setLoading(true);

        const isValid = handleValidation();

        if (!isValid) return;

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
                    setLoading(false);
                }
                else if (response.ResponseCode) {
                    await delay(15000);
                    try {
                        await PaymentServices.queryMpesaPayments(response.CheckoutRequestID, data.businessCode).then(async (response) => {
                            if (response.ResultCode == "0") {
                                const result = {
                                    months: state.months,
                                    paymentResult: response
                                }
                                try {
                                    await BookingServices.makePayment(booking?.tenant?._id, result).then((response) => {
                                        toast({
                                            ...toastProps,
                                            title: "Success",
                                            description: response.message,
                                            status: "success",
                                        })
                                        setLoading(false);
                                        window.location.reload();
                                    })
                                } catch (error) {
                                    toast({
                                        ...toastProps,
                                        title: "Error!",
                                        description: getError(error),
                                        status: "error",
                                    });
                                    setLoading(false);
                                }
                            }
                            else {
                                toast({
                                    ...toastProps,
                                    title: "Error!",
                                    description: "Payment wasn't processed successfully please try again",
                                    status: "error",
                                });
                                setLoading(false);
                            }
                        })
                    } catch (error) {
                        toast({
                            ...toastProps,
                            title: "Error!",
                            description: getError(error),
                            status: "error",
                        });
                        setLoading(false);
                    }
                }
            })
        }
        catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            });
            setLoading(false);
        }
    }

    return (
        <UserLayout>
            <Helmet title={"Booking"}>
                <div className="mt-24 mb-10 mx-10 md:mx-20">
                    {stateLoading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full md:w-3/4 flex flex-col gap-6">
                                <div className="w-full border border-primary_color rounded-lg p-3 h-fit">
                                    <h3 className="text-2xl font-bold">Personal Information</h3>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <p><span className="font-semibold">Full name:</span> {booking?.tenant?.userDetails?.firstname + " " + booking?.tenant?.userDetails?.lastname}</p>
                                        <p><span className="font-semibold">Phone number:</span> {"+254".concat(booking?.tenant?.userDetails?.phoneNumber)}</p>
                                        {booking?.tenant?.userDetails?.school && <p><span className="font-semibold">School:</span> {booking?.tenant?.userDetails?.school}</p>}
                                        {booking?.tenant?.userDetails?.regNo && <p><span className="font-semibold">Registration number:</span> {booking?.tenant?.userDetails?.regNo}</p>}
                                    </div>
                                </div>
                                <div className="w-full border border-primary_color rounded-lg p-3 h-fit">
                                    <h3 className="text-2xl font-bold">Hostel Information</h3>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <p><span className="font-semibold">Hostel name:</span> {booking?.hostel?.name}</p>
                                        <p><span className="font-semibold">Room No.:</span> {booking?.tenant.roomNo}</p>
                                        {(booking?.tenant.isPaid && booking?.tenant.isPaymentApproved) && <p><span className="font-semibold">Duration:</span> {convertDateTimeFormart(booking?.tenant.paymentApprovedAt)} - {convertDateTimeFormart(booking?.tenant.paymentDueDate)}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/4 border border-primary_color rounded-lg h-fit">
                                <div className="text-center py-3">
                                    <p className="font-semibold text-xl">Payment details</p>
                                </div>
                                {!booking?.tenant?.isPaid ? (
                                    <div className="mx-4">
                                        <div className="text-lg flex item-center gap-4">
                                            <p className="font-bold">Amount:</p>
                                            <p><span className="font-semibold">Kes. </span>{data.amount === 0 ? "" : data.amount}</p>
                                        </div>
                                        <Box className="flex  flex-col gap-1 w-full">
                                            <FormControl my={2} isRequired>
                                                <FormLabel>Duration of Months</FormLabel>
                                                <CustomInput
                                                    width="full"
                                                    placeholder={"1"}
                                                    handleChange={handleChange}
                                                    name={"months"}
                                                    type={"number"}
                                                />
                                            </FormControl>
                                        </Box>

                                        <div className="mt-4 flex flex-col gap-2">
                                            <p className="font-semibold text-md">Payment option:</p>
                                            <img src={mpesaLogo} alt="Mpesa" className="w-44 h-8" />
                                            <div className="my-3">
                                                <p className="font-semibold text-md">Payment details:</p>
                                                <ul className="ml-5 list-disc">
                                                    <li>Paybill number: <span className="font-semibold">{booking?.landLord?.paymentPayBillNumber}</span></li>
                                                    <li>Account: <span className="font-semibold">{booking?.landLord?.accountName}</span></li>
                                                    <li>Amount: <span className="font-semibold">{data.amount === 0 ? "" : data.amount}</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <Box className="flex flex-col gap-1 w-full">
                                            <FormControl my={2} isRequired>
                                                <FormLabel>Payment number</FormLabel>
                                                <CustomInput
                                                    width="full"
                                                    icon={<PreNumberFormart />}
                                                    placeholder={"720000000"}
                                                    handleChange={handleChange}
                                                    name={"paymentNumber"}
                                                    type={"number"}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box className="my-3 flex justify-end">
                                            {loading ?
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
                                ) : (booking?.tenant.isPaid && !booking?.tenant.isPaymentApproved) ? (
                                    <div className="mx-4">
                                        <Center>
                                            <div className="text-center">
                                                <Center>
                                                    <TfiReload className="text-primary_yellow text-4xl" />
                                                </Center>
                                                <p className="mt-5 text-2xl">Waiting payment approval</p>
                                                <p className="mt-8"><span className="font-semibold">Paid on: </span>{convertDateTimeFormart(booking?.tenant.paidAt)}</p>
                                            </div>
                                        </Center>
                                    </div>
                                ) : (booking?.tenant.isPaid && booking?.tenant.isPaymentApproved && booking?.tenant.paymentDueDate >= Date.now()) ? (
                                    <div className="mx-4">
                                        <Center>
                                            <div className="text-center">
                                                <Center>
                                                    <BsCheck2Circle className="text-primary_red text-4xl" />
                                                </Center>
                                                <p className="mt-5 text-2xl">You occupying this hostel is due</p>
                                            </div>
                                        </Center>
                                    </div>
                                ) : (
                                    <div className="mx-4">
                                        <Center>
                                            <div className="text-center">
                                                <Center>
                                                    <BsCheck2Circle className="text-primary_green text-4xl" />
                                                </Center>
                                                <p className="mt-5 text-2xl">Active</p>
                                                <p className="mt-8"><span className="font-semibold">Paid on: </span>{convertDateTimeFormart(booking?.tenant.paidAt)}</p>
                                                <p className="mt-8"><span className="font-semibold">Approved on: </span>{convertDateTimeFormart(booking?.tenant.paymentApprovedAt)}</p>
                                            </div>
                                        </Center>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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