import UserLayout from "../../components/UserLayout";
import { Center, Text } from "@chakra-ui/react";
import numberWithCommas from "../../utils/numberWithCommas";
import CustomButton from "../../components/general/CustomButton";
import { ImLocation } from "react-icons/im";
import { BiMaleFemale } from "react-icons/bi";
import RoomNumber from "../../components/general/RoomNumber";
import HostelImage from "../../components/HostelImage";
import Helmet from "../../components/general/Helemet";
import { FaWhatsapp } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { useSpecificHostel } from "../../hooks/useHostel";
import Loader from "../../components/general/Loader";

export const HostelScreen = () => {

    let { slug } = useParams();

    const { stateLoading, hostel } = useSpecificHostel(slug);

    const handleScrollToRooms = () => {
        const element = document.getElementById("rooms");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const handleWhatsapp = (number, hostelName) => {

        window.open(` https://web.whatsapp.com/send?phone=${number}&text=Hi%20Hello%2C%0D%0ALike%20to%20know%20more%20about%20${hostelName}`, "_blank");
    };

    var numberArray = Array.from({ length: hostel?.house?.numberOfRooms }, (_, index) => index + 1);
    var resultArray = numberArray.map(num => hostel?.house?.houseNamingPattern + num);

    return (
        <UserLayout>
            <Helmet title="Hostel">
                {stateLoading ? (
                    <div className="h-screen">
                        <Center>
                            <Loader />
                        </Center>
                    </div>
                ) : (
                    <div>
                        <div className="relative">
                            <div className="w-full h-[550px]">
                                <img src={hostel?.house?.images[0]} alt="sample" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute top-[40%] inset-x-80" data-aos="fade-up">
                                <div className="text-center">
                                    <Text className="text-white font-bold text-5xl">
                                        {hostel?.house?.name}
                                    </Text>
                                </div>
                            </div>
                            <div className="absolute top-[85%] inset-x-32" data-aos="fade-up">
                                <div className="bg-white drop-shadow-lg">
                                    <div className="p-9">
                                        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-5">
                                            <div className="col-span-2 pr-5 border-r-2">
                                                <h3 className="mt-2 mb-4 font-bold text-xl">{hostel?.house?.name} Description</h3>
                                                <p>
                                                    {hostel?.house?.description}
                                                </p>
                                            </div>
                                            <div className="pl-5">
                                                <p className="mt-2 text-xs uppercase">from</p>
                                                <Text className="font-semibold text-2xl ml-10 mb-8">
                                                    ksh. {numberWithCommas(Number(hostel?.house?.rentalFee))} per Month
                                                </Text>
                                                <CustomButton variant={"solid"} handleClick={handleScrollToRooms}>
                                                    Book now
                                                </CustomButton>

                                                <div className="mt-8 flex flex-col gap-6">
                                                    <div className="flex items-center gap-10 text-gray-600">
                                                        <ImLocation className="text-3xl text-primary_color" />
                                                        <span>{hostel?.house?.region?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-10 text-gray-600" id="rooms">
                                                        <BiMaleFemale className="text-3xl text-primary_color" />
                                                        <span>{hostel?.house?.gender}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-10 mb-10 md:mx-20 mt-80" data-aos="fade-up">
                            <div className="text-center">
                                <h3 className="text-4xl font-semibold">Rooms Available</h3>
                                <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-5">
                                    {resultArray?.map((room, index) => (
                                        <RoomNumber key={index} roomNumber={room} hostel={hostel?.house} />
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="my-16" data-aos="fade-up">
                            <div className="text-center">
                                <h3 className="text-4xl font-semibold">Gallery</h3>
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4">
                                    {hostel?.house?.images?.map((image, index) => (
                                        <HostelImage key={index} image={image} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Text
                            className='text-white bg-[#5DD468] p-3 rounded-full cursor-pointer fixed bottom-24 right-5 shadow-3xl'
                            onClick={() => handleWhatsapp("254".concat(hostel?.landLord.whatsappNumber), hostel?.house?.name)}
                        >
                            <FaWhatsapp className='text-4xl' />
                        </Text>
                    </div>
                )}
            </Helmet>
        </UserLayout>
    )
}

