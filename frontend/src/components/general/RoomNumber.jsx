import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BookingServices from "../../utils/services/BookingServices";
import { toastProps } from "../../utils/toastProps";
import { getError } from "../../utils/getError";
import { useHouseStore } from "../../utils/zustand/Store";

const RoomNumber = ({ roomNumber, hostel }) => {

  const toast = useToast();
  const navigate = useNavigate();

  const [isSpaceAvailable, setIsSpaceAvailable] = useState(false);

  useEffect(() => {
    BookingServices.checkRoomSpaceAvailability(roomNumber, hostel?.numberPerRoom).then(async (response) => {
      if (response.message === "Space available") {
        setIsSpaceAvailable(true)
      }
    })
  }, [roomNumber, hostel?.numberPerRoom]);

  const setHouse = useHouseStore((state) => state.setHouse);

  const handleCheckRoomAvailability = async () => {
    try {
      await BookingServices.checkIfTenantHasBookedBefore().then((response) => {
        if (response.message === "can book") {
          navigate(`/hostel/${hostel.slug}/${roomNumber}`)
          setHouse(hostel);
        }
        else {
          toast({
            ...toastProps,
            description: "Your have already booked a space",
            status: "success"
          })
        }
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

  return isSpaceAvailable ? (
    <div onClick={handleCheckRoomAvailability} className="p-6 bg-primary_color_light text-primary_color cursor-pointer shadow-none rounded-md hover:shadow-2xl hover:border-0 hover:scale-105 transition-all">
      <div className="flex justify-center items-center">
        {roomNumber}
      </div>
    </div>
  ): (
    <div className="p-6 bg-gray-200 text-gray-800 shadow-none rounded-md">
      <div className="flex justify-center items-center">
        {roomNumber}
      </div>
    </div>
  )
}

RoomNumber.propTypes = {
  roomNumber: PropTypes.string,
  hostel: PropTypes.object
}

export default RoomNumber