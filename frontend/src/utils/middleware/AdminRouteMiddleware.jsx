import PropTypes from "prop-types";
import Page403Screen from "../../screens/Page403Screen";
import useUserStore from "../zustand/Store";
import { Navigate } from "react-router-dom";

const AdminRouteMiddleware = ({ children }) => {
  const user = useUserStore((state) => state.user);

  return user.token && !user.isVerified ? <Navigate to="/verify_your_account" /> : (user?.token && user?.isAdmin) ? <>{children}</> : <Page403Screen />;
};

AdminRouteMiddleware.propTypes = {
  children: PropTypes.element.isRequired
}

export default AdminRouteMiddleware;