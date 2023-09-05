import PropTypes from 'prop-types';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Helmet from './general/Helemet';
import useUserStore from "../utils/zustand/Store";
import { toastProps } from '../utils/toastProps';
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {

  const toast = useToast();
  const navigate = useNavigate();
  const removeToken = useUserStore((state) => state.removeToken);

  const [showSideBar, setShowSideBar] = useState(true);

  const handleToggle = () => {
    setShowSideBar((prev) => !prev);
  };

  const logout = () => {
    removeToken();
    toast({
      ...toastProps,
      title: "Success",
      description: "Admin logged out successfully",
      status: "success",
    });
    navigate("/");
  }

  return (
    <Helmet title="Admin Dashboard">
      <div className="flex flex-row h-screen bg-gray-100">
        <SideNav show={showSideBar} logout={logout} />

        <div className="min-h-full w-[100%]">
          <TopNav toggleSideBar={handleToggle} logout={logout} />
          {children}
        </div>
      </div>
    </Helmet>

  )
}

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default AdminLayout