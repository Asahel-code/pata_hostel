import PropTypes from "prop-types";
import { useState } from "react";
import CustomModal from "../components/general/CustomModal";
import { Box, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import CustomInput from "../components/general/CustomInput";
import RegionServices from "../utils/services/RegionServices";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";

const AddLocationModal = ({ handleOpen, handleClose }) => {

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await RegionServices.addRegion({ name }).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response.message,
                    status: "success"
                });
                setLoading(false);
                handleClose();
                window.location.reload();
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Success",
                description: getError(error),
                status: "success"
            });
            setLoading(false);
        }
    }

    return (
        <CustomModal
            isOpen={handleOpen}
            onClose={handleClose}
            title="Add Location"
            showSave={true}
            handleSave={handleSave}
            loadingSave={loading}
        >
            <div className="flex gap-4">
                <div className="w-full">
                    <Box className="flex flex-col gap-1 w-full">
                        <FormControl my={2} isRequired>
                            <FormLabel>Location name</FormLabel>
                            <CustomInput
                                width="full"
                                placeholder={"Location name"}
                                handleChange={(e) => setName(e.target.value)}
                                name={"location"}
                                type={"text"}
                            />
                        </FormControl>
                    </Box>
                </div>

            </div>
        </CustomModal>
    )
}

AddLocationModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}


export default AddLocationModal