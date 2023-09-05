import AxiosUtility, { setAuthToken } from "./AxiosServices";

const login = async (data) => {
  const res = await AxiosUtility.post("/auth/", data);

  return res.data;
}

const register = async (data) => {
  const res = await AxiosUtility.post("/register/", data);

  return res.data;
}

const registerLandLord = async (data) => {
  const res = await AxiosUtility.post("/register/landlord", data);

  return res.data;
}

const verifyAccount = async (data) => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.post("/auth/verifyAccount", data);

  return res.data;
}

const resendVerificationToken = async () => {
  setAuthToken(AxiosUtility);
  const res = await AxiosUtility.get("/auth/resendVerificationToken");

  return res.data;
}

const requestPasswordReset = async (data) => {
  const res = await AxiosUtility.post("/auth/passwordResetRequest", data);

  return res.data;
}

const resetPassword = async (data) => {
  const res = await AxiosUtility.post("/auth/resetPassword", data);

  return res.data;
}


const AuthServices = { login, register, registerLandLord, requestPasswordReset, resetPassword, verifyAccount, resendVerificationToken };




export default AuthServices;