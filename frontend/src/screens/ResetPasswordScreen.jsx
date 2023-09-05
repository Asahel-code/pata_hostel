import { useState } from 'react';
import Helmet from '../components/general/Helemet';
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { getError } from '../utils/getError';
import UserLayout from '../components/UserLayout';
import CustomInput from '../components/general/CustomInput';
import { AiOutlineMail } from 'react-icons/ai';
import { toastProps } from '../utils/toastProps';
import CustomButton from '../components/general/CustomButton';
import LoadingButton from '../components/general/LoadingButton';
import AuthServices from '../utils/services/AuthServices';

const ResetPasswordScreen = () => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await AuthServices.resetPassword({ email, currentPassword, password, passwordConfirmation }).then((response) => {
        toast({
          ...toastProps,
          title: "Success",
          description: response.message,
          status: "success",
        });
        setLoading(false);
        navigate("/login");
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
      <Helmet title='Reset password'>
        <div className="flex justify-center items-center mt-28 mb-10 mx-5 lg:mx-96 md:mx-10">
          <div className='w-full md:w-1/2 border border-primary_color rounded-lg'>
            <section className="w-full h-full">
              <div className="text-center bg-primary_color rounded-t-md py-2">
                <h2 className="font-bold text-white uppercase text-xl md:text-2xl">Update your password</h2>
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
                <Box className="flex  flex-col gap-1 w-full">
                  <FormControl my={2} isRequired>
                    <FormLabel>Otp</FormLabel>
                    <CustomInput
                      width="full"
                      placeholder={"Otp"}
                      handleChange={(e) => setCurrentPassword(e.target.value)}
                      name={"currentPassword"}
                      type={"text"}
                    />
                  </FormControl>
                </Box>
                <Box className="flex  flex-col gap-1 w-full">
                  <FormControl my={2} isRequired>
                    <FormLabel>New password</FormLabel>
                    <CustomInput
                      width="full"
                      placeholder={"********"}
                      handleChange={(e) => setNewPassword(e.target.value)}
                      name={"password"}
                      type={passwordType}
                      handleEyeClick={(type) => setPasswordType(type)}
                    />
                  </FormControl>
                </Box>
                <Box className="flex  flex-col gap-1 w-full">
                  <FormControl my={2} isRequired>
                    <FormLabel>Confirm your password</FormLabel>
                    <CustomInput
                      width="full"
                      placeholder={"********"}
                      handleChange={(e) => setPasswordConfirmation(e.target.value)}
                      name={"passwordConfirmation"}
                      type={passwordType}
                      handleEyeClick={(type) => setPasswordType(type)}
                    />
                  </FormControl>
                </Box>


                {loading
                  ?
                  <LoadingButton />
                  : <CustomButton
                    type={"submit"}
                    variant={"solid"}
                  >
                    Submit
                  </CustomButton>
                }

              </form>
            </section>
          </div>

        </div>
      </Helmet>
    </UserLayout>
  )
}

export default ResetPasswordScreen