import { useState, useEffect } from 'react';
import Helmet from '../components/general/Helemet';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import useUserStore from "../utils/zustand/Store";
import { getError } from '../utils/getError';
import UserLayout from '../components/UserLayout';
import CustomInput from '../components/general/CustomInput';
import { AiOutlineMail } from 'react-icons/ai';
import { toastProps } from '../utils/toastProps';
import CustomButton from '../components/general/CustomButton';
import LoadingButton from '../components/general/LoadingButton';
import AuthServices from '../utils/services/AuthServices';

const SigninScreen = () => {
  const setToken = useUserStore((state) => state.setToken);
  const user = useUserStore((state) => state.user);

  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    if (user?.token) {
      if (user?.isLandLord) {
        navigate('/landlord/setup')
      }
      else {
        navigate('/')
      }
    }
  }, [user?.token, user?.isLandLord, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthServices.login({ email, password }).then((response) => {
        setToken(response);
        toast({
          ...toastProps,
          title: "Success",
          description: `${response.username}, you have login successfully`,
          status: "success",
        });
        setLoading(false);

        if (response.isLandLord) {
          navigate('/landlord/setup');
        }
        else {
          navigate('/');
        }

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
      <Helmet title="Login">
        <div className="flex justify-center items-center mt-28 mb-10 mx-5 md:mx-10">
          <div className='w-full md:w-1/2 border border-primary_color rounded-lg'>
            <section className="w-full h-full">
              <div className="text-center bg-primary_color rounded-t-md py-2">
                <h2 className="font-bold text-white uppercase text-xl md:text-2xl">Welcome back</h2>
              </div>
              <form onSubmit={handleSubmit} className='px-8 py-5'>
                <Box className="flex flex-col gap-1 w-full">
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
                    <FormLabel>Password</FormLabel>
                    <CustomInput
                      width="full"
                      placeholder={"*******"}
                      handleChange={(e) => setPassword(e.target.value)}
                      name={"password"}
                      type={passwordType}
                      handleEyeClick={(type) => setPasswordType(type)}
                    />
                  </FormControl>
                </Box>
                <Box className="my-3">
                  {loading ?
                    <LoadingButton />
                    :
                    <CustomButton
                      type={"submit"}
                      variant={"solid"}
                    >
                      Login
                    </CustomButton>
                  }
                </Box>

                <div className="flex justify-end items-center pb-4">
                  <span className="text-sm">
                    <Link className="hover:text-primary_color hover:underline" to="/request_reset_password">&nbsp; Forgot your password?</Link>
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="text-sm">Would like to join us today?
                    <Link className="hover:text-primary_color hover:underline" to="/register">&nbsp; Click here to register</Link>
                  </span>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Helmet>
    </UserLayout>
  )
}

export default SigninScreen