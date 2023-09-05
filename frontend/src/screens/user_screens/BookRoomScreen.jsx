import { useState } from "react";
import UserLayout from "../../components/UserLayout"
import { useParams, useNavigate } from "react-router-dom"
import { Box, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import CustomInput, { CustomSelect } from "../../components/general/CustomInput";
import CustomButton from "../../components/general/CustomButton";
import LoadingButton from "../../components/general/LoadingButton";
import { toastProps } from "../../utils/toastProps";
// import mpesaLogo from "../../assets/images/mpesa_logo.png";
import Helmet from "../../components/general/Helemet";
import { useHouseStore } from "../../utils/zustand/Store";
import BookingServices from "../../utils/services/BookingServices";
import { getError } from "../../utils/getError";

export const BookRoomScreen = () => {
    let { room_number } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const house = useHouseStore((state) => state.house);
    const removeHouse = useHouseStore((state) => state.removeHouse);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        persona: "",
        school: "",
        regNo: "",
        idNo: "",
        phoneNumber: "",
    });

    const handleValidation = () => {
        if (state.firstname === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input you first name",
                status: "error",
            })
            return false;
        }
        else if (state.lastname === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input you last name",
                status: "error",
            })
            return false;
        }
        else if (state.persona === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please select a persona that fits your description",
                status: "error",
            })
            return false;
        }
        else if (state.phoneNumber === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input you phone number",
                status: "error",
            })
            return false;
        }
        else if (state.idNo === "") {
            toast({
                ...toastProps,
                title: "Error!",
                description: "Please input you ID number",
                status: "error",
            })
            return false;
        }
        else if (state.persona === "student") {
            if (state.school === "") {
                toast({
                    ...toastProps,
                    title: "Error!",
                    description: "Please input school name",
                    status: "error",
                })
                return false;
            }
            else if (state.regNo === "") {
                toast({
                    ...toastProps,
                    title: "Error!",
                    description: "Please input you school student registration number",
                    status: "error",
                })
                return false;
            }
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

        const data = {
            roomNo: room_number,
            house: {
                hostel: house?.hostel,
                landlord: house?.landlord,
            },
            userDetails: {
                firstname: state?.firstname,
                lastname: state?.lastname,
                school: state?.school,
                regNo: state?.regNo,
                idNo: state?.idNo,
                phoneNumber: state?.phoneNumber,
            },
        }

        try {
            await BookingServices.bookHouse(data).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response?.message,
                    status: "success",
                });
                setLoading(false);
                removeHouse();
                navigate('/')
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

    return (
        <UserLayout>
            <Helmet title={`Book Room ${room_number}`}>
                <div className="mt-24 mx-10 md:mx-20">
                    <div>
                        <h3 className="font-bold text-2xl">Room No: <span className="text-primary_color">{room_number}</span></h3>
                    </div>
                    <div className="my-12">
                        <p className="text-xl mb-4">Your Information</p>
                        <div className="">
                            <form onSubmit={handleSubmit} className="">
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
                                        <FormLabel>Your phone number</FormLabel>
                                        <CustomInput
                                            width="full"
                                            icon={<PreNumberFormart />}
                                            placeholder={"720000000"}
                                            handleChange={handleChange}
                                            name={"phoneNumber"}
                                            type={"number"}
                                        />
                                    </FormControl>
                                </Box>
                                <Box className="flex  flex-col gap-1 w-full">
                                    <FormControl my={2} isRequired>
                                        <FormLabel>Persona</FormLabel>
                                        <CustomSelect
                                            width="full"
                                            placeholder={"Your persona"}
                                            handleChange={handleChange}
                                            name={"persona"}
                                        >
                                            <option value="student">Student</option>
                                            <option value="non-student">Non-student</option>
                                        </CustomSelect>
                                    </FormControl>
                                </Box>
                                {state.persona === "student" && (
                                    <Box>
                                        <Box className="flex  flex-col gap-1 w-full">
                                            <FormControl my={2} isRequired>
                                                <FormLabel>Name of School</FormLabel>
                                                <CustomInput
                                                    width="full"
                                                    placeholder={"University/College name"}
                                                    handleChange={handleChange}
                                                    name={"school"}
                                                    type={"text"}
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box className="flex  flex-col gap-1 w-full">
                                            <FormControl my={2} isRequired>
                                                <FormLabel>Your student registration number</FormLabel>
                                                <CustomInput
                                                    width="full"
                                                    placeholder={"Your student registration number"}
                                                    handleChange={handleChange}
                                                    name={"regNo"}
                                                    type={"text"}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                )}
                                <Box className="flex  flex-col gap-1 w-full">
                                    <FormControl my={2} isRequired>
                                        <FormLabel>Your ID/ Passport number</FormLabel>
                                        <CustomInput
                                            width="full"
                                            placeholder={"Your ID number"}
                                            handleChange={handleChange}
                                            name={"idNo"}
                                            type={"text"}
                                        />
                                    </FormControl>
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
                        </div>

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

