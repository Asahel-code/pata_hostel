import PropTypes from "prop-types";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";

const DeleteAlert = ({ handleOpen, handleClose, handleDelete, body, id }) => {
    return (
        <AlertDialog
            isOpen={handleOpen}
            onClose={handleClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="md" fontWeight="bold">
                        Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody fontSize={"sm"}>{body}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button fontSize={"sm"} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDelete(id)} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

DeleteAlert.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired
}

export default DeleteAlert