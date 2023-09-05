import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import CustomModal from "../components/general/CustomModal";
import { Box, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import CustomInput, { CustomSelect } from "../components/general/CustomInput";
import { useLocation } from "../hooks/useLocation";
import HouseServices from "../utils/services/HouseServices";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";


const UpdateHostelModal = ({ handleOpen, handleClose, current }) => {

    const toast = useToast();

    const { regions } = useLocation();

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        name: "",
        region: "",
        gender: "",
        description: "",
        numberOfRooms: "",
        numberPerRoom: "",
        houseNamingPattern: "",
        rentalFee: 0
    });

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            name: current?.name,
            region: current?.region?.name,
            gender: current?.gender,
            description: current?.description,
            numberOfRooms: current?.numberOfRooms,
            numberPerRoom: current?.numberPerRoom,
            houseNamingPattern: current?.houseNamingPattern,
            rentalFee: current?.rentalFee
        }))
    }, [current]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState(...state, { [name]: value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await HouseServices.updateHouse({...state,  slug: state?.name?.toLowerCase()} , current?.slug).then((response) => {
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
            title="Update Hostel"
            showUpdate={true}
            handleUpdate={handleUpdate}
            loadingSave={loading}
        >
            <div>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Hostel name</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Hostel name"}
                            handleChange={handleChange}
                            name={"name"}
                            type={"text"}
                            value={state?.name}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Location</FormLabel>
                        <CustomSelect
                            width="full"
                            handleChange={handleChange}
                            name={"region"}
                        >
                            <option value={state?.region}>{state?.region}</option>
                            {regions?.map((region, index) => (
                                <option key={index} value={region.id}>{region.name}</option>
                            ))}
                        </CustomSelect>
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            onChange={handleChange}
                            placeholder='Your hostel description'
                            name={"description"}
                            focusBorderColor={"#05A3FF"}
                            borderColor={"#05A3FF"}
                            value={state?.description}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Rental fee per month</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Original price"}
                            handleChange={handleChange}
                            name={"rentalFee"}
                            type={"number"}
                            value={state?.rentalFee}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Gender specification</FormLabel>
                        <CustomSelect
                            width="full"
                            handleChange={handleChange}
                            name={"gender"}
                        >
                            <option value={state?.gender}>{state?.gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Mixed">Mixed</option>
                        </CustomSelect>
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Number of rooms</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Number of rooms"}
                            handleChange={handleChange}
                            name={"numberOfRooms"}
                            type={"number"}
                            value={state?.numberOfRooms}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Number of occupant per room</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Number of occupant per room"}
                            handleChange={handleChange}
                            name={"numberPerRoom"}
                            type={"number"}
                            value={state?.numberPerRoom}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Rooms naming pattern</FormLabel>
                        <CustomInput
                            width="full"
                            placeholder={"Rooms naming pattern"}
                            handleChange={handleChange}
                            name={"houseNamingPattern"}
                            type={"text"}
                            value={state?.houseNamingPattern}
                        />
                    </FormControl>
                </Box>
            </div>
        </CustomModal>
    )
}

UpdateHostelModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired
}

export default UpdateHostelModal