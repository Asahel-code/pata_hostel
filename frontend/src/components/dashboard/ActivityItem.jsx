import PropTypes from 'prop-types'

const ActivityItem = ({ icon, name, number, bg, iconColor }) => {
  return (
    <div className="p-2 px-6 border-r border-gray-200 w-[250px] m-1 flex justify-center gap-2">
      <div className={`h-16 w-16 ${bg} ${iconColor} rounded-md flex justify-center items-center text-3xl`}>
        {icon}
      </div>
      <div className="text-left">
        <p className="text-gray-500 text-sm">{name}</p>
        <p className="font-bold text-3xl">{number}</p>
      </div>
    </div>
  )
}

ActivityItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  bg: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
}

export default ActivityItem