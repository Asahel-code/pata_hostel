import PropTypes from "prop-types";
import Page403Screen from "../../screens/Page403Screen";
import useUserStore from "../zustand/Store";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LandLordServices from "../services/LandLordServices";
import { toastProps } from "../toastProps";
import { getError } from "../getError";

const LandlordRoutesMiddleware = ({ children }) => {

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    try {
      LandLordServices.checkLandlord().then((response) => {
        if (response.message !== "Ok") {
          navigate('/landlord/setup')
        }
      })
    } catch (error) {
      toast({
        ...toastProps,
        title: "Error!",
        description: getError(error),
        status: "error",
      })
    }
  }, [navigate, toast]);

  return user.token && !user.isVerified ? <Navigate to="/verify_your_account" /> : (user?.token && user?.isLandLord) ? <>{children}</> : <Page403Screen />;
};

LandlordRoutesMiddleware.propTypes = {
  children: PropTypes.element.isRequired
}

export default LandlordRoutesMiddleware;