import PropTypes from 'prop-types';
import { TfiReload } from "react-icons/tfi";
import { GoCheck } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const MessageBox = ({ status, children }) => {

  const messageBoxStyling = "py-1 px-2 rounded-xl flex items-center gap-1 text-md font-semibold w-fit";
  return (
    <button className={status == "paid" ? `${messageBoxStyling} text-primary_green bg-primary_green_light` : (status == "awaiting approval" || status == "awaiting payment") ? `${messageBoxStyling} text-yellow-500 bg-yellow-200` : status == "rental pay due" && `${messageBoxStyling} text-primary_red bg-primary_red_light`}>
      {children}
      {status == "paid" ? <GoCheck className="text-lg" /> : (status == "awaiting approval" || status == "awaiting payment") ? <TfiReload className="text-lg" /> : status == "rental pay due" && <RxCross2 />}
    </button>
  )
}

MessageBox.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
}


export default MessageBox