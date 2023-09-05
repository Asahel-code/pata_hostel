import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Wrapper from '../general/Wrapper';
import ActivityItem from './ActivityItem';
import { BsCheck2Circle } from "react-icons/bs";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

const LandlordCard = ({ totalOccupiedSpace, awaitingPayment  }) => {


  const activities = useMemo(() => [
    {
      title: "Awaiting payment",
      no: awaitingPayment,
      icon: <LiaMoneyBillWaveAltSolid />,
      bg: "bg-primary_yellow_light",
      iconColor: "text-primary_yellow"
    },
    {
      title: "Occupied space",
      no: totalOccupiedSpace,
      icon: <BsCheck2Circle  />,
      bg: "bg-primary_green_light",
      iconColor: "text-primary_green"
    },
  ], [totalOccupiedSpace, awaitingPayment]);

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

LandlordCard.propTypes = {
  totalAvialableSpace: PropTypes.any.isRequired,
  totalOccupiedSpace: PropTypes.any.isRequired,
  awaitingPayment: PropTypes.any.isRequired,
}

export default LandlordCard