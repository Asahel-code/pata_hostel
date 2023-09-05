import PropTypes from "prop-types";
import { useState } from 'react';
import CustomModal from '../components/general/CustomModal';
import { useToast } from "@chakra-ui/react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import HouseServices from "../utils/services/HouseServices";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";

const UpdateHostelImagesModal = ({ handleOpen, handleClose, current }) => {

    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.values(images).forEach(image => {
            formData.append('images', image);
        });

        try {
            await HouseServices.updateImagesHouse(formData, current?.slug).then((response) => {
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
            title={`Update Hostel Image`}
            showUpdate={true}
            handleUpdate={handleUpdate}
            loadingUpdate={loading}
        >

            <div className="flex">
                <div className="flex justify-center w-1/5">
                    <label htmlFor="file" className="flex gap-2 items-center">
                        <span>Image: </span><RiUploadCloud2Fill className="text-3xl text-primary_color cursor-pointer" />
                    </label>
                    <input
                        type="file"
                        multiple
                        id="file"
                        style={{ display: "none" }}

                        onChange={(e) => setImages(prev => [...prev, ...e.target.files])}
                        accept="image/png, image/jpg, image/jpeg"
                    />
                </div>
                <div className="grid grid-cols-3 gap-1 py-4 w-4/5">
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
                            />
                        </div>
                    )}
                </div>
            </div>
        </CustomModal>
    )
}

UpdateHostelImagesModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired
}

export default UpdateHostelImagesModal