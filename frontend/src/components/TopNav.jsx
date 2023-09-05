import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import useUserStore from "../utils/zustand/Store";
import { Link } from "react-router-dom";

const TopNav = ({ toggleSideBar, logout }) => {

    const [showAdminDropDown, setShowAdminDropDown] = useState(false);
    const user = useUserStore((state) => state.user);

    return (
        <div className="h-[60px] bg-primary_color_light flex justify-between">
            <button
                className={"hover:text-primary_color p-1 rounded-md focus:outline-none"}
                onClick={toggleSideBar}
            >
                <HiBars3 className="text-3xl" />
            </button>

            <div className="flex items-center gap-2">
                <button
                    className={
                        "hover:bg-zinc-100 p-2 rounded-full focus:outline-none relative"
                    }
                >
                </button>
                <Box
                    className="relative"
                    onMouseEnter={() => setShowAdminDropDown(true)}
                    onMouseLeave={() => setShowAdminDropDown(false)}
                >
                    <Box display={"flex"} gap={0.5} alignItems={"center"} >
                        <Text className="text-md">Hi, <span className="text-primary_color font-semibold text-lg">{user?.username}</span></Text>
                        <RiArrowDropDownLine className="text-4xl" />
                    </Box>
                    {showAdminDropDown && (
                        <Box boxShadow='sm' rounded='md' bg='white' className="absolute w-[120px] lg:right-2">
                            {user?.isLandLord && (
                                <Box>
                                    <Link to="/landlord/profile">
                                        <Box className="px-4 py-2 hover:bg-gray-100 hover:text-primary_color hover:font-medium text-md">
                                            Profile
                                        </Box>
                                    </Link>
                                </Box>
                            )}
                            <Box
                                cursor={"pointer"}
                                className="px-4 py-2 hover:text-primary_color hover:bg-gray-100 text-md border-t-2 font-bold"
                                onClick={() => logout()}
                            >
                                logout
                            </Box>
                        </Box>
                    )}
                </Box>
            </div>
        </div>
    )
}

TopNav.propTypes = {
    toggleSideBar: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
}


export default TopNav;
