import PropTypes from "prop-types";
import CustomModal from "../components/general/CustomModal"
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TermsAndConditionModal = ({ handleOpen, handleClose, handleSubmit, hostel }) => {

  const navigate = useNavigate();

  const handleDisagree = () => {
    navigate(`/hostel/${hostel.slug}`)
  }
  return (
    <CustomModal
      isOpen={handleOpen}
      onClose={handleClose}
      title={`${hostel.name} Terms and Conditions`}
      size={"xl"}
    >
      <p>
        {hostel.termsAndCondition}
      </p>

      <div className="mt-6 flex justify-center gap-8">
        <Button variant={"solid"} colorScheme="gray" onClick={handleDisagree}>
          DisAgree
        </Button>
        <Button variant={"solid"} colorScheme="blue" onClick={handleSubmit}>
          Agree
        </Button>
      </div>
    </CustomModal>
  )
}

TermsAndConditionModal.propTypes = {
  handleOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hostel: PropTypes.object.isRequired
}

export default TermsAndConditionModal