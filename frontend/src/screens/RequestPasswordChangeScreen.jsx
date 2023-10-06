import { useState } from 'react';
import Helmet from '../components/general/Helemet';
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import AuthServices from '../utils/services/AuthServices';
import { useNavigate } from "react-router-dom";
import { getError } from '../utils/getError';
import UserLayout from '../components/UserLayout';
import CustomInput from '../components/general/CustomInput';
import { AiOutlineMail } from 'react-icons/ai';
import { toastProps } from '../utils/toastProps';
import CustomButton from '../components/general/CustomButton';
import LoadingButton from '../components/general/LoadingButton';

const RequestPasswordChangeScreen = () => {

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthServices.requestPasswordReset({ email }).then((response) => {
        toast({
          ...toastProps,
          title: "Success",
          description: response.message,
          status: "success",
        });
        setLoading(false);
        navigate("/reset_password");
      })
    } catch (error) {
      toast({
        ...toastProps,
        title: "Error!",
        description: getError(error),
        status: "error",
      });
      setLoading(false);
    }
  }
  
  return (
    <UserLayout>
      <Helmet title="Reset password">
        <div className="flex justify-center items-center mt-28 mb-10 mx-5 lg:mx-96 md:mx-10">
          <div className='w-full md:w-9/12 border border-primary_color rounded-lg'>
            <section className="w-full h-full">
              <div className="text-center bg-primary_color rounded-t-md py-2">
                <h2 className="font-bold text-white uppercase text-xl md:text-2xl">Request password Change</h2>
              </div>
              <form onSubmit={handleSubmit} className='px-8 py-5'>
                <Box className="flex  flex-col gap-1 w-full">
                  <FormControl my={2} isRequired>
                    <FormLabel>Email</FormLabel>
                    <CustomInput
                      icon={<AiOutlineMail className="text-xl text-gray-400 ml-3" />}
                      width="full"
                      placeholder={"Email"}
                      handleChange={(e) => setEmail(e.target.value)}
                      name={"email"}
                      type={"text"}
                    />
                  </FormControl>
                </Box>

                <Box className="my-3">
                  {loading ?
                    <LoadingButton />
                    : <CustomButton
                      type={"submit"}
                      variant={"solid"}
                    >
                      Submit
                    </CustomButton>
                  }
                </Box>

              </form>
            </section>
          </div>
        </div>
      </Helmet>
    </UserLayout>
  )
}

export default RequestPasswordChangeScreen