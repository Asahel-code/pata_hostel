import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import CustomButton from './general/CustomButton';
import LoadingButton from './general/LoadingButton';
import CustomInput, { CustomSelect } from './general/CustomInput';
import { useScreenListener } from '../hooks/useScreenListener';
import { useTenantAndHostelCount } from '../hooks/useCount';
import { useLocation } from "../hooks/useLocation";

const TopBanner = ({ handleChange, loading, handleSearch, state }) => {

    const [showLabel, setShowLabel] = useState(false);

    const screenSize = useScreenListener();

    const { hostelCount, tenantCount } = useTenantAndHostelCount();
    const { regions } = useLocation();

    useEffect(() => {
        if (screenSize <= 910) {
            setShowLabel(true)
        }
        else {
            setShowLabel(false)
        }
    }, [screenSize]);

    const handleScrollToHostels = () => {
        const element = document.getElementById("hostels");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="relative bg-primary_color_light">
            <div className="">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:py-20 md:py-14 pt-10 pb-44">
                    <div className="px-8 md:px-24">
                        <h1 className="capitalize lg:text-5xl text-xl font-bold pb-4 lg:tracking-wide" data-aos="fade-down">Find a hostel that suit you</h1>
                        <p className="text-gray-500" data-aos="fade-down">What to find a hostel? We are ready to help you find one that suit your needs and budget</p>
                        <div className="md:py-8 py-4" data-aos="fade-down">
                            <CustomButton variant={"solid"} width={"200px"} handleClick={handleScrollToHostels}>
                                Check out
                            </CustomButton>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pb-5">
                            <div data-aos="fade-up">
                                <div className="flex items-center gap-1">
                                    <span className="md:text-2xl md:font-bold text-lg font-semibold">{hostelCount}</span>
                                    <span className="md:text-2xl md:font-bold text-lg font-semibold text-[#3874F1]">
                                        +
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Listed hostels</p>
                            </div>
                            <div data-aos="fade-up">
                                <div className="flex items-center gap-1">
                                    <span className="md:text-2xl md:font-bold text-lg font-semibold">{tenantCount}</span>
                                    <span className="md:text-2xl md:font-bold text-lg font-semibold text-[#3874F1]">
                                        +
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">No. of Students accomodated</p>
                            </div>
                        </div>
                    </div>
                    <div className="image_section md:block hidden" data-aos="zoom-in">
                    </div>
                </div>
            </div>
            <div className="absolute lg:top-[90%] top-[60%] lg:inset-x-64 inset-x-20" data-aos="fade-up">
                <div className="bg-white drop-shadow-lg rounded-md">
                    <div className="py-6 px-4 flex justify-center">
                        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:gap-5">
                            <div className='w-full'>
                                <FormControl>
                                    {showLabel && <FormLabel>Gender</FormLabel>}
                                    <CustomSelect
                                        name="gender"
                                        width={"full"}
                                        value={state.gender}
                                        handleChange={handleChange}
                                    >
                                        <option value="">select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Mixed">Mixed</option>
                                    </CustomSelect>
                                </FormControl>
                            </div>
                            <div className='w-full'>
                                <FormControl>
                                    {showLabel && <FormLabel>Location</FormLabel>}
                                    <CustomSelect
                                        name="location"
                                        width={"full"}
                                        value={state.location}
                                        handleChange={handleChange}
                                    >
                                        <option value="">Select a location</option>
                                        {regions?.map((region, index) => (
                                            <option key={index} value={region.id}>{region.name}</option>
                                        ))}
                                    </CustomSelect>
                                </FormControl>
                            </div>
                            <div className='w-full'>
                                <FormControl>
                                    {showLabel && <FormLabel>Mini price</FormLabel>}
                                    <CustomInput
                                        type={"number"}
                                        width={"full"}
                                        name={"minPrice"}
                                        value={state.minPrice}
                                        placeholder="Mini-price"
                                        handleChange={handleChange}
                                    />
                                </FormControl>
                            </div>
                            <div className='w-full'>
                                <FormControl>
                                    {showLabel && <FormLabel>Max price</FormLabel>}
                                    <CustomInput
                                        type={"number"}
                                        width={"full"}
                                        name={"maxPrice"}
                                        value={state.maxPrice}
                                        placeholder="Max-price"
                                        handleChange={handleChange}
                                    />
                                </FormControl>
                            </div>
                            <div className='flex items-center' id="hostels">
                                {loading ? <LoadingButton /> : <CustomButton handleClick={handleSearch} variant={"solid"}>Search</CustomButton>}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

TopBanner.propTypes = {
    handleChange: PropTypes.func,
    handleSearch: PropTypes.func,
    loading: PropTypes.bool,
    state: PropTypes.object,
}


export default TopBanner