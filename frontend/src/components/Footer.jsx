import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { ImQuotesLeft } from "react-icons/im";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { VscMail } from 'react-icons/vsc';
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const FooterSection = () => {


    const footerAboutLinks = [
        {
            display: "Home",
            path: "/",
        },
        {
            display: "About us",
            path: "/about",
        },
        {
            display: "Contact us",
            path: "/contact",
        },
        {
            display: "Manage your hostel with us",
            path: "/landlord/register",
        }
    ];


    let datenow = new Date();


    return (
        <div className="bg-white text-black border-t-[1px]">
            <div className="pt-5 px-4 pb-8 md:px-10 md:pt-8 ">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 sm:gap-10">
                        <div>
                            <div className="mb-4">
                                <Link to="/">
                                    <h2 className="text-xl font-bold">Pata Hostel</h2>
                                </Link>
                            </div>
                            <div className="flex gap-2 text-gray-700">
                                <span><ImQuotesLeft /></span>
                                <span>
                                    Our business is built off of close relationships and
                                    we are glad that we are able to share our products
                                    with our clients
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-black font-bold uppercase mb-5">Links</div>
                            <div className="flex flex-col gap-2">
                                {footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link className="text-gray-700 hover:text-primary_color hover:font-medium" to={item.path}>{item.display}</Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-black font-bold uppercase mb-5">Contact us</div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <HiOutlineLocationMarker className="text-primary_color text-2xl" />
                                    <div className="flex flex-col gap-2">
                                        <h6 className="font-semibold">Address:</h6>
                                        <div className="flex flex-col gap-1 text-gray-700">
                                            <p>AEA plaza, Valley road</p>
                                            <p>Office D4</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <HiOutlineDevicePhoneMobile className="text-primary_color text-2xl" />
                                    <div className="flex flex-col gap-2">
                                        <h6 className="font-semibold">Mobile:</h6>
                                        <div className="flex flex-col gap-1 text-gray-700">
                                            <p>0723-600-710</p>
                                            <p>0787-600-100</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <VscMail className="text-primary_color text-2xl" />
                                    <div>
                                        <h6 className="mb-2 font-semibold">Email:</h6>
                                        <Link to="mailto:support@patahostel.co.ke" className="text-gray-700">support@patahostel.co.ke</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t-[1px] mt-6 pt-3">
                        <Text fontSize={"md"}>&copy; {datenow.getFullYear()} Pata Hostel</Text>

                        <div className="flex space-x-6  sm:justify-center text-gray-400">
                            <div className="hover:text-primary_color cursor-pointer">
                                <Link to="https://www.facebook.com" target="_blank">
                                    <BsFacebook />
                                </Link>
                            </div>

                            <div className="hover:text-primary_color cursor-pointer">
                                <Link to="https://www.instagram.com" target="_blank">
                                    <BsInstagram />
                                </Link>
                            </div>

                            <div className="hover:text-primary_color cursor-pointer">
                                <Link to="https://www.twitter.com" target="_blank">
                                    <BsTwitter />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSection