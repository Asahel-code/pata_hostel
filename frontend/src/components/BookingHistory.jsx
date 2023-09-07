import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import ActionButton from "./general/ActionButton"
import MessgeBox from "./general/MessageBox"
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";
import BookingServices from "../utils/services/BookingServices";
import DeleteAlert from "./general/DeleteAlert";

const BookingHistory = ({ booking }) => {

    const toast = useToast();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [bookingId, setBookingId] = useState("");

    const handleOpenDeleteAlert = useCallback(() => {
        setOpenDeleteAlert(true);
    }, []);

    const handleCloseDeleteAlert = useCallback(() => {
        setOpenDeleteAlert(false);
    }, []);

    const handleDelete = async (id) => {
        try {
            await BookingServices.deleteBooking(id).then(() => {
                toast({
                    ...toastProps,
                    title: "Success",
                    description: "Hostel has been deleted successfully",
                    status: "success",
                });
            });
            handleCloseDeleteAlert();
            window.location.reload();
        } catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            });
            handleCloseDeleteAlert();
        }
    }

    return (
        <>
            <div className="p-4 shadow-md hover:shadow-2xl flex items-center justify-between rounded-md">
                <Link to={`/my_booking_history/${booking.id}`}>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl">Hostel: <span className="font-semibold">{booking?.hostel}</span></h3>
                        <p>Room number: <span className="font-semibold">{booking?.roomNo}</span></p>
                        {!booking?.isPaid ? (
                            <MessgeBox status={booking?.paymentStatus}>
                                Waiting payment
                            </MessgeBox>
                        ) : (booking?.isPaid && !booking?.isApproved) ? (
                            <MessgeBox status={booking?.paymentStatus}>
                                Waiting approval
                            </MessgeBox>
                        ) : (booking?.isPaid && booking?.isApproved && booking?.occumpationDueDate >= Date.now()) ? (
                            <MessgeBox status={booking?.paymentStatus}>
                                You occupying this hostel is due
                            </MessgeBox>
                        ) : (
                            <MessgeBox status={booking?.paymentStatus}>
                                Paid
                            </MessgeBox>
                        )
                        }
                    </div>
                </Link>
                <div>
                    <Link to={`/my_booking_history/${booking.id}`}>
                        <ActionButton>
                            <AiOutlineEye className="text-5xl" />
                        </ActionButton>
                    </Link>
                    {!booking?.isPaid && (
                        <ActionButton handleClick={() => {
                            handleOpenDeleteAlert(),
                                setBookingId(booking.id)
                        }}>
                            <AiOutlineDelete className="text-5xl" />
                        </ActionButton>
                    )}
                </div>

            </div>
            <DeleteAlert
                handleOpen={openDeleteAlert}
                handleClose={handleCloseDeleteAlert}
                handleDelete={handleDelete}
                id={bookingId}
                body="Are you sure you would like to delete this booking??"
            />
        </>


    )
}
BookingHistory.propTypes = {
    booking: PropTypes.object.isRequired
}


export default BookingHistory