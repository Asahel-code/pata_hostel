import PropTypes from "prop-types";

const HostelImage = ({ image }) => {
    return (
        <div className="h-96 w-full">
            <img src={image} alt="hostel" className="h-full w-full object-cover" />
        </div>
    )
}

HostelImage.propTypes = {
    image: PropTypes.string
}

export default HostelImage