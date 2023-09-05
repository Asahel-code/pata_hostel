import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { HiOutlineUserGroup, HiHome } from "react-icons/hi";
import Wrapper from '../general/Wrapper';
import ActivityItem from './ActivityItem';

const AdminCard = ({ numberOfLandlord, hostelsCount }) => {


    const activities = useMemo(() => [
        {
            title: "Landlord accounts",
            no: numberOfLandlord,
            icon: <HiOutlineUserGroup />,
            bg: "bg-primary_blue_light",
            iconColor: "text-primary_blue"
        },
        {
            title: "Hostels registered",
            no: hostelsCount,
            icon: <HiHome />,
            bg: "bg-primary_blue_light",
            iconColor: "text-primary_blue"
        },
    ], [numberOfLandlord, hostelsCount]);

    return (
        <Wrapper py={2} >
            <div className="flex justify-between gap-4">
                <div className="flex flex-wrap 2xl:flex-nowrap ">
                    {activities?.map((act, index) => (
                        <ActivityItem
                            key={index}
                            icon={act?.icon}
                            name={act?.title}
                            number={act.no}
                            bg={act?.bg}
                            iconColor={act?.iconColor}
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

AdminCard.propTypes = {
    numberOfLandlord: PropTypes.any.isRequired,
    hostelsCount: PropTypes.any.isRequired,
}

export default AdminCard