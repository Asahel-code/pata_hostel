import PropTypes from "prop-types";
import { useState } from "react";
import CustomModal from "../components/general/CustomModal";
import { Box, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import CustomInput, { CustomSelect } from "../components/general/CustomInput";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useLocation } from "../hooks/useLocation";
import HouseServices from "../utils/services/HouseServices";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";

const AddHostelModal = ({ handleOpen, handleClose }) => {
    const toast = useToast();
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
    const [images, setImages] = useState([]);

    const { regions } = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('slug', state.name.toLowerCase());
        formData.append('region', state.region);
        formData.append('gender', state.gender);
        Object.values(images).forEach(image => {
            formData.append('images', image);
        });
        formData.append('description', state.description);
        formData.append('numberOfRooms', state.numberOfRooms);
        formData.append('numberPerRoom', state.numberPerRoom);
        formData.append('houseNamingPattern', state.houseNamingPattern);
        formData.append('rentalFee', state.rentalFee);

        try {
            await HouseServices.addHouse(formData).then((response) => {
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
            title="Add Hostel"
            showSave={true}
            handleSave={handleSave}
            loadingSave={loading}
        >
            <div className="flex gap-4">
                <div className="w-3/5">
                    <Box className="flex flex-col gap-1 w-full">
                        <FormControl my={2} isRequired>
                            <FormLabel>Hostel name</FormLabel>
                            <CustomInput
                                width="full"
                                placeholder={"Hostel name"}
                                handleChange={handleChange}
                                name={"name"}
                                type={"text"}
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
                                <option value="">Select a location</option>
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
                                <option value="">Select a gender</option>
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
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className="w-2/5 flex justify-center">
                    <div>
                        <div className="flex justify-center">
                            <label htmlFor="file" className="flex gap-2 items-center">
                                <span>Image: </span><RiUploadCloud2Fill className="text-3xl text-primary_color cursor-pointer" />
                            </label>
                            <input
                                type="file"
                                multiple
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => setImages(prev => [...prev, ...e.target.files])}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            {images?.map((image, index) => {
                                return (
                                    <div className="h-[100px]" key={index}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                            className="h-full rounded-lg object-cover"
                                        />
                                    </div>
                                )
                            })}
                            {!images?.length && (
                                <div className="h-[100px]">
                                    <img
                                        src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        alt=""
                                        className="h-full rounded-lg object-cover"
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}

AddHostelModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default AddHostelModal