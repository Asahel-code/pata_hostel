import { useState } from "react";
import { Center, useToast } from "@chakra-ui/react";
import Hostel from "../../components/Hostel";
import TopBanner from "../../components/TopBanner";
import UserLayout from "../../components/UserLayout";
import Helmet from "../../components/general/Helemet";
import { useHostel } from "../../hooks/useHostel";
import Loader from "../../components/general/Loader";
import { toastProps } from "../../utils/toastProps";
import { getError } from "../../utils/getError";

export const HomeScreen = () => {

  const toast = useToast();

  const { stateLoading, loading, filteredHostels, handleHostelSearch } = useHostel();

  const [state, setState] = useState({
    gender: "",
    location: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleValidation = () => {
    if (state.gender === "") {
      toast({
        ...toastProps,
        title: "Error",
        description: "Please select gender",
        status: "error"
      });

      return false;
    }
    else if (state.location === "") {
      toast({
        ...toastProps,
        title: "Error",
        description: "Please select location",
        status: "error"
      });

      return false;
    }
    else if (state.minPrice === "") {
      toast({
        ...toastProps,
        title: "Error",
        description: "Please input your minimum price",
        status: "error"
      });

      return false;
    }
    else if (state.maxPrice === "") {
      toast({
        ...toastProps,
        title: "Error",
        description: "Please input your maximum price",
        status: "error"
      });

      return false;
    }

    return true;
  }

  const handleChange = (e) => {
    e.persist();
    const { value, name } = e.target;

    setState({ ...state, [name]: value });
  }

  const handleSearch = async () => {

    const isValid = handleValidation();

    if (!isValid) return;

    try {
      handleHostelSearch(state)
      setState({
        ...state,
        gender: "",
        location: "",
        minPrice: "",
        maxPrice: ""
      });
      
    } catch (error) {
      toast({
        ...toastProps,
        title: "Error",
        description: getError(error),
        status: "error"
      });
    }
  }


  return (
    <UserLayout>
      <Helmet title="Home">
        <TopBanner handleChange={handleChange} loading={loading} handleSearch={handleSearch} state={state} />
        <div className="mx-5 my-10 md:mx-10 lg:mx-20">
          <div className="mt-24 mb-10">
            <h3 className="font-bold text-md sm:text-lg md:text-xl lg:text-4xl">Featured Hostels</h3>
          </div>

          {stateLoading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
              {filteredHostels?.map((hostel, index) => (
                <Hostel
                  key={index}
                  hostel={hostel}
                />
              ))}

            </div>
          )}
        </div>
      </Helmet>
    </UserLayout >
  )
}

