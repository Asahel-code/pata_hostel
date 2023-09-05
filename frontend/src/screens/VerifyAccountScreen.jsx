import { useState } from 'react';
import Helmet from '../components/general/Helemet';
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { getError } from '../utils/getError';
import UserLayout from '../components/UserLayout';
import useUserStore from '../utils/zustand/Store';
import CustomInput from '../components/general/CustomInput';
import { toastProps } from '../utils/toastProps';
import CustomButton from '../components/general/CustomButton';
import LoadingButton from '../components/general/LoadingButton';
import AuthServices from '../utils/services/AuthServices';


const VerifyAccountScreen = () => {

  const setToken = useUserStore((state) => state.setToken);
  const toast = useToast();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthServices.verifyAccount({ otp }).then((response) => {
        setToken(response);
        toast({
          ...toastProps,
          title: "Success",
          description: response.message,
          status: "success",
        });
        setLoading(false);
        navigate('/')
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
      <Helmet title='Verify Account'>
        <div className="flex justify-center items-center mt-28 mb-20 mx-5 md:mx-10 lg:mx-96">
          <section className="w-full h-full">
            <div className="text-center bg-primary_color rounded-t-md py-2">
              <h2 className="font-bold text-white uppercase text-xl md:text-2xl">Verify your account</h2>
            </div>
            <div className="mt-4">
              <p className="text-sm">Check your email, a verification code has been sent to you</p>
            </div>
            <form onSubmit={handleSubmit} className='px-8 py-5'>
              <Box className="flex  flex-col gap-1 w-full">
                <FormControl my={2} isRequired>
                  <FormLabel>Verification code</FormLabel>
                  <CustomInput
                    width="full"
                    placeholder={"......"}
                    handleChange={(e) => setOtp(e.target.value)}
                    name={"otp"}
                    type={"text"}
                  />
                </FormControl>
              </Box>
              <ResendVerificationToken />

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
      </Helmet>
    </UserLayout>
  )
}

export default VerifyAccountScreen

const ResendVerificationToken = () => {

  const toast = useToast();

  let countdownTime = 60;

  const [isRequested, setIsRequested] = useState(false);
  const [counter, setCounter] = useState(countdownTime);


  const countDownTimer = () => {
    var countdownInterval = setInterval(() => {
      setCounter(countdownTime--);

      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  const resendVerificationToken = async () => {
    setIsRequested(true)

    countDownTimer();
    try {
      await AuthServices.resendVerificationToken().then((response) => {
        toast({
          ...toastProps,
          title: "Success",
          description: response.message,
          status: "success",
        });
      })

      setTimeout(() => {
        setIsRequested(false);
      }, countdownTime * 1000);

    } catch (error) {
      toast({
        ...toastProps,
        title: "Error!",
        description: getError(error),
        status: "error",
      });

      setTimeout(() => {
        setIsRequested(false);
      }, countdownTime * 1000);
    }
  }

  return (
    <div className="flex justify-end py-3">
      {isRequested ?
        <div className="flex justify-end py-0">
          <p className="text-sm text-gray-400 py-0" >Try again after {counter}s</p>
        </div>
        : <div className="flex justify-end py-0">
          <p className="text-sm cursor-pointer hover:font-semibold py-0" onClick={resendVerificationToken}>Resend code</p>
        </div>
      }
    </div>
  )
}