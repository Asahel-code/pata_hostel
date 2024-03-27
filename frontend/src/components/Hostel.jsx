import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import numberWithCommas from "../utils/numberWithCommas";
import { ImLocation } from "react-icons/im";
import { BiMaleFemale, BiMale, BiFemale  } from "react-icons/bi";
import { GiPersonInBed } from "react-icons/gi";

const Hostel = ({ hostel }) => {
    return (
        <div data-aos="fade-up">
            <Link to={`/hostel/${hostel.slug}`}>
                <Box className="w-full shadow-none rounded-lg hover:shadow-2xl border-[1px] border-gray-200 hover:border-0 hover:scale-105 transition-all">
                    <Box className="m-0">
                        <div className="rounded-t-lg h-64">
                            <img src={hostel.images[0]} alt="hostel" className="h-full w-full object-cover rounded-t-lg" />
                        </div>
                    </Box>
                    <div className="text-justify px-3">
                        <div className="text-center text-sm md:text-lg">
                            <Text className="text-gray-700 font-semibold py-4">
                                {hostel?.name}
                            </Text>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                                <ImLocation className="text-xl text-primary_color" />
                                <span>{hostel.region}</span>
                            </div>
                            {hostel?.gender?.toLowerCase() == "mixed" ? (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BiMaleFemale className="text-xl text-primary_color" />
                                    <span>{hostel.gender}</span>
                                </div>
                            ) : hostel?.gender?.toLowerCase() == "male" ? (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BiMale className="text-xl text-primary_color" />
                                    <span>{hostel.gender}</span>
                                </div>
                            ) : hostel?.gender?.toLowerCase() == "female" && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BiFemale className="text-xl text-primary_color" />
                                    <span>{hostel.gender}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <div className="text-sm md:text-lg">
                                <Text className="text-gray-700 font-semibold py-4">
                                    Ksh.{numberWithCommas(Number(hostel.rentalFee))} per Month
                                </Text>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <GiPersonInBed className="text-2xl text-primary_color" />
                                <span>{hostel.numberPerRoom} sharing</span>
                            </div>
                        </div>


                    </div>
                </Box>
            </Link>
        </div>
    )
}

Hostel.propTypes = {
    hostel: PropTypes.object.isRequired
}

export default Hostel