import { Box, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../utils/zustand/Store";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toastProps } from "../utils/toastProps";

const Header = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [openNav, setOpenNav] = useState(false);
    const user = useUserStore((state) => state.user);
    const removeToken = useUserStore((state) => state.removeToken);
    const [show, setShow] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    const navbarStyling = "fixed w-full top-0 left-0 z-[99] bg-transparent";


    const logout = () => {
        removeToken();
        toast({
            ...toastProps,
            title: "Success",
            description: "You have logged out successfully. Welcome back again",
            status: "success",
        });
        navigate("/");
    }

    const userNavList = (
        <Box className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link to="/about" className="hover:text-primary_color hover:font-medium text-md">
                About us
            </Link>

            <Link to="/contact" className="hover:text-primary_color hover:font-medium text-md">
                Contact us
            </Link>
            <Box>
                {user?.token
                    ? (
                        <Box
                            className="relative"
                            onMouseEnter={() => setShowDropDown(true)}
                            onMouseLeave={() => setShowDropDown(false)}
                        >
                            <Box display={"flex"} gap={0.5} alignItems={"center"} >
                                <Text className="text-md">{user?.username}</Text>
                                <RiArrowDropDownLine className="text-4xl" />
                            </Box>
                            {showDropDown && (
                                <Box boxShadow='sm' rounded='md' bg='white' className="absolute w-[180px] lg:right-2">
                                    {user?.isAdmin && (
                                        <Link to="/admin/dashboard">
                                            <Box className="px-4 py-2 hover:bg-gray-100 hover:text-primary_color hover:font-medium text-md">
                                                Admin Dashboard
                                            </Box>
                                        </Link>
                                    )}
                                    {user?.isLandLord && (
                                        <Box>
                                            <Link to="/landlord/dashboard">
                                                <Box className="px-4 py-2 hover:bg-gray-100 hover:text-primary_color hover:font-medium text-md">
                                                    Landlord Dashboard
                                                </Box>
                                            </Link>
                                            <Link to="/landlord/profile">
                                                <Box className="px-4 py-2 hover:bg-gray-100 hover:text-primary_color hover:font-medium text-md">
                                                    Profile
                                                </Box>
                                            </Link>
                                        </Box>
                                    )}

                                    {(!user?.isLandLord && !user?.isAdmin) && (
                                        <Link to="/my_booking_history">
                                            <Box className="px-4 py-2 hover:bg-gray-100 hover:text-primary_color hover:font-medium text-md">
                                                My Booking
                                            </Box>
                                        </Link>
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
                    ) : (
                        <Box className="flex md:gap-2 flex-col md:flex-row">
                            <Box className="p-1 font-normal">
                                <Link to="/login" className="hover:text-primary_color hover:font-medium text-md flex items-center">
                                    <span className="capitalize">login</span>
                                </Link>
                            </Box>
                            <Box className="p-1 font-normal">
                                <Link to="/register" className="hover:text-primary_color hover:font-medium text-md flex items-center">
                                    <span className="capitalize">register</span>
                                </Link>
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );

    return (
        <Box className={show ? `${navbarStyling} shrink` : navbarStyling}>
            <div className="mx-3 flex items-center justify-between">
                {/* Logo */}
                <Box
                    className="mr-4 cursor-pointer py-1.5 font-bold text-lg"
                >
                    <Link to="/">
                        <h2 className="text-xl md:text-3xl">Pata Hostel</h2>
                    </Link>
                </Box>

                {/* Other links */}
                <div className="hidden lg:block">{userNavList}</div>
                <Box
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </Box>
            </div>
            {openNav &&
                <Box
                    className="fixed top-15 right-0 w-full px-5 bg-white z-[99]"
                    style={{
                        transform: "translateX(-0%)",
                        transition: "transform 0.10s ease",
                    }}
                >
                    {userNavList}
                </Box>
            }
        </Box>
    );
}

export default Header