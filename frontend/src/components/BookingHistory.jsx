import PropTypes from "prop-types";
import { AiOutlineEye } from "react-icons/ai"
import ActionButton from "./general/ActionButton"
import MessgeBox from "./general/MessageBox"
import { Link } from "react-router-dom";

const BookingHistory = ({ booking }) => {
    return (
        <Link to={`/my_booking_history/${booking.id}`}>
            <div className="p-4 shadow-md hover:shadow-2xl flex items-center justify-between rounded-md">
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
                <ActionButton>
                    <AiOutlineEye className="text-5xl" />
                </ActionButton>
            </div>
        </Link>

    )
}
BookingHistory.propTypes = {
    booking: PropTypes.object.isRequired
}


export default BookingHistory