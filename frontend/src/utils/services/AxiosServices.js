import axios from "axios";

export const ENDPOINT = "/api/v1";
const BASE_URL = ENDPOINT;

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const setAuthToken = (instance) => {
  const { state } = JSON.parse(localStorage?.getItem("pata_hostel_user"));
  const token = state?.user?.token;

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default AxiosUtility;