import { Center } from "@chakra-ui/react"
import BookingHistory from "../../components/BookingHistory"
import UserLayout from "../../components/UserLayout"
import Helmet from "../../components/general/Helemet"
import { useTenantBooking } from "../../hooks/useTenant"
import Loader from "../../components/general/Loader"
import { Link } from "react-router-dom"


export const BookingHistorySreen = () => {

    const { stateLoading, bookings } = useTenantBooking();

    return (
        <UserLayout>
            <Helmet title="Booking history">
                <div className="mt-28 mb-10 mx-5 md:mx-10">
                    {stateLoading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : bookings?.length > 0 ? (
                        bookings?.map((booking, index) => (
                            <BookingHistory key={index} booking={booking} />
                        ))
                    ) : (
                        <Center>
                            <p className="text-2xl py-7">Currently, you do not have any booking history. <Link to="/" className="hover:text-primary_color font-bold">Click here</Link> to view available hostels</p>
                        </Center>
                    )}
                </div>
            </Helmet>
        </UserLayout>
    )
}
