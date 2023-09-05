import { useState, useEffect } from 'react';
import Helmet from '../../components/general/Helemet';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { getError } from '../../utils/getError';
import UserLayout from '../../components/UserLayout';
import CustomInput from '../../components/general/CustomInput';
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserCircle } from "react-icons/fa";
import { toastProps } from '../../utils/toastProps';
import CustomButton from '../../components/general/CustomButton';
import LoadingButton from '../../components/general/LoadingButton';
import AuthServices from '../../utils/services/AuthServices';
import useUserStore from '../../utils/zustand/Store';

export const LanlordSignupScreen = () => {
  const toast = useToast();

  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmationType, setPasswordConfirmationType] = useState("password");

  useEffect(() => {
    if (user?.token) {
      navigate('/');
    }
  }, [navigate, user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthServices.registerLandLord({ name, email, password, passwordConfirmation }).then((response) => {
        toast({
          ...toastProps,
          title: "Success",
          description: response.message,
          status: "success",
        })
        setLoading(false);
        navigate('/login');
      })
    } catch (error) {
      toast({
        ...toastProps,
        title: "Error!",
        description: getError(error),
        status: "error",
      })
      setLoading(false);
    }
  }

  return (
    <UserLayout>
      <Helmet title="Signup">
        <div className="flex justify-center items-center mt-28 mb-10 mx-5 md:mx-10">
          <div className='w-full md:w-1/2 border border-primary_color rounded-lg'>
            <section className="w-full h-full">
              <div className="text-center bg-primary_color rounded-t-md py-2">
                <h2 className="font-bold text-white uppercase text-xl md:text-2xl">Be part of us today</h2>
              </div>
              <form onSubmit={handleSubmit} className='px-8 py-5'>
                <Box className="flex flex-col gap-1 w-full">
                  <FormControl my={2} isRequired>
                    <FormLabel>Name</FormLabel>
                    <CustomInput
                      icon={<FaUserCircle className="text-xl text-gray-400 ml-3" />}
                      width="full"
                      placeholder={"John Doe"}
                      handleChange={(e) => setUserName(e.target.value)}
                      name={"username"}
                      type={"text"}
                    />
                  </FormControl>
                </Box>
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
                      placeholder={"********"}
                      handleChange={(e) => setPassword(e.target.value)}
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
                      type={passwordConfirmationType}
                      handleEyeClick={(type) => setPasswordConfirmationType(type)}
                    />
                  </FormControl>
                </Box>

                <div className="flex items-center gap-2">
                  <input type="checkbox" name="remember_me" />
                  <label htmlFor="remember me">Accept all <Link to="#">terms & condition</Link></label>
                </div>
                <Box className="my-3">
                  {loading ?
                    <LoadingButton />
                    : <CustomButton
                      type={"submit"}
                      variant={"solid"}
                    >
                      Register
                    </CustomButton>
                  }
                </Box>
                <div>
                  <span className="text-sm">Already have an account?</span>
                  <Link className="hover:text-primary_color hover:underline" to="/login">&nbsp;Click here to signin</Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      </Helmet>
    </UserLayout>
  )
}

