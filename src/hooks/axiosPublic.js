import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://cars-omega-two.vercel.app/",
  });

  return instance;
};

export default useAxiosPublic;