import PropTypes from 'prop-types';
import CustomModal from '../components/general/CustomModal';
import BookingServices from '../utils/services/BookingServices';
import { Center, useToast } from '@chakra-ui/react';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';
import { BsCheck2All } from 'react-icons/bs';
import { useState } from 'react';

const ApproveHostelPaymentModal = ({ handleOpen, handleClose, current }) => {

    const toast = useToast();

    const [isApproved, setIsApproved] = useState(false);

    const handlePaymentApproval = async () => {
        try {
            await BookingServices.approvePayment(current?.id).then((response) => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: response.message,
                    status: "success"
                });
                setIsApproved(true);
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
        }
    }
    return (
        <CustomModal
            isOpen={handleOpen}
            onClose={handleClose}
            title="Approve payment"
            size={"sm"}
        >
            <div className='my-4'>
                <Center>
                    <div className={`${isApproved ? 'bg-primary_color_light' : 'bg-slate-300 cursor-pointer'} flex gap-4 p-3 rounded-md hover:shadow-md`}>
                        <div className='text-xl' onClick={handlePaymentApproval}>
                            Approve
                        </div>
                        {isApproved && (<BsCheck2All className='text-primary_green' />)}
                    </div>
                </Center>
            </div>
        </CustomModal>
    )
}

ApproveHostelPaymentModal.propTypes = {
    handleOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired
}

export default ApproveHostelPaymentModal