import PropTypes from 'prop-types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import CustomButton from './CustomButton';
import LoadingButton from './LoadingButton';

const CustomModal = ({
    isOpen,
    onClose,
    title = "Modal Title",
    children,
    showSave = false,
    showUpdate = false,
    handleSave,
    handleUpdate,
    loadingSave,
    loadingUpdate,
    size
}) => {
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset='slideInBottom'
                size={size ? size : "xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form encType="multipart/form-data" onSubmit={showSave ? handleSave : handleUpdate}>
                            {children}

                            <div className="my-2 flex justify-end gap-3">
                                <CustomButton
                                    handleClick={() => onClose()}
                                    type="button"
                                    variant={"outline"}
                                    width={"100px"}
                                >
                                    Close
                                </CustomButton>
                                {showSave &&
                                    (loadingSave
                                        ?
                                        <LoadingButton />
                                        :
                                        <CustomButton
                                            type="submit"
                                            variant={"solid"}
                                            width={"100px"}
                                        >
                                            Save
                                        </CustomButton>
                                    )
                                }
                                {showUpdate &&
                                    (loadingUpdate ?
                                        <LoadingButton />
                                        :
                                        <CustomButton
                                            type="submit"
                                            variant={"solid"}
                                            width={"100px"}
                                        >
                                            Update
                                        </CustomButton>
                                    )
                                }
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div >
    )
}

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    showSave: PropTypes.bool,
    showUpdate: PropTypes.bool,
    handleSave: PropTypes.func,
    handleUpdate: PropTypes.func,
    loadingSave: PropTypes.bool,
    loadingUpdate: PropTypes.bool,
    size: PropTypes.string
}


export default CustomModal