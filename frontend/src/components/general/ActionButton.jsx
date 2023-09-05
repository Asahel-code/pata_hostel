import PropTypes from "prop-types";

const ActionButton = ({ bg, children, handleClick }) => (
    <button
        className={`${bg} rounded-md font-bold text-gray-300 hover:text-primary_color text-2xl p-1`}
        onClick={handleClick}
        type={"button"}
    >
        {children}
    </button>
);

ActionButton.propTypes = {
    bg: PropTypes.string, 
    children: PropTypes.element.isRequired, 
    handleClick: PropTypes.func 
}

export default ActionButton