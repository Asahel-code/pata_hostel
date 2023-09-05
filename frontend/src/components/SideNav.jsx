import PropTypes from "prop-types";
import { useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineUserGroup, HiHome } from "react-icons/hi";
import { GoGraph } from "react-icons/go";
import { ImLocation } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../utils/zustand/Store";
import CustomButton from "./general/CustomButton";

const SideNav = ({ show, logout }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("/admin/dashboard");

    const user = useUserStore((state) => state.user);

    const handleCurrent = (selected, to) => {
        setCurrent(selected.toLowerCase());
        if (to !== "") navigate(to);
    }

    return (
        <div className={`w-[230px] h-screen ${!show && "hidden"} ease-in-out bg-primary_color_light shrink-0`}>
            {/* Logo */}
            <Link to="/">
                <div className="flex justify-center items-center py-10">
                    <h2 className="text-xl md:text-3xl font-semibold">Pata Hostel</h2>
                </div>
            </Link>

            {/* Nav Items */}
            <div className="h-[70%] flex flex-col gap-4 p-2">
                {user?.isAdmin ? (admin_menu_list.map((menu, key) => (
                    <MenuItem
                        key={key}
                        icon={menu.icon}
                        title={menu.name}
                        isCurrent={menu.name.toLowerCase() === current}
                        handleClick={() => handleCurrent(menu.name, menu?.to)}
                    />
                ))) : (
                    user?.isLandLord && (landlord_menu_list.map((menu, key) => (
                        <MenuItem
                            key={key}
                            icon={menu.icon}
                            title={menu.name}
                            isCurrent={menu.name.toLowerCase() === current}
                            handleClick={() => handleCurrent(menu.name, menu?.to)}
                        />
                    )))
                )}
            </div>
            <div className="flex justify-center m-2">
                <CustomButton
                    variant={"solid"}
                    leftIcon={<FiLogOut className="text-2xl" />}
                    handleClick={() => logout()}
                >
                    Logout
                </CustomButton>
            </div>
        </div>
    )
}

SideNav.propTypes = {
    show: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
}


export default SideNav;

const MenuItem = ({
    icon,
    title,
    isCurrent,
    handleClick,
}) => (
    <div className="w-full py-1">
        <div className={`cursor-pointer rounded-md ${isCurrent && "bg-primary_color hover:text-white"} w-full hover:bg-primary_color hover:text-white`} onClick={handleClick}>
            <div className="flex items-center gap-2 h-10 px-2">
                <div className={`text-lg`}>
                    {icon}
                </div>
                <div className="text-md">
                    {title}
                </div>
            </div>
        </div>
    </div>
);

MenuItem.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
}

const admin_menu_list = [
    {
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: <MdOutlineDashboard />
    },
    {
        name: "Locations",
        to: "/admin/locations",
        icon: <ImLocation />
    },
    {
        name: "Landlord Management",
        to: "/admin/landlord_management",
        icon: <HiOutlineUserGroup />
    }
]

const landlord_menu_list = [
    {
        name: "Dashboard",
        to: "/landlord/dashboard",
        icon: <MdOutlineDashboard />
    },
    {
        name: "Hostels",
        to: "/landlord/hostels",
        icon: <HiHome />
    },
    {
        name: "Hostel Occupants",
        to: "/landlord/hostel_occupants",
        icon: <HiOutlineUserGroup />
    },
    {
        name: "Hostel Payments",
        to: "/landlord/hostel_payments",
        icon: <GoGraph />,
    },
]