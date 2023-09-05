import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserStore from "../zustand/Store";

const AuthRouteMiddleware = ({ children }) => {
  const user = useUserStore((state) => state.user);

  return user.token && !user.isVerified ? <Navigate to="/verify_your_account" /> : user.token ? <>{children}</> : <Navigate to="/login" />;
};

AuthRouteMiddleware.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthRouteMiddleware;