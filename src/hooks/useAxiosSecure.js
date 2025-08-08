// useAxiosSecure.js
import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: "https://cars-omega-two.vercel.app/",
  });

  // Attach token from localStorage to every request
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("carvia-access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    const resInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Axios error:", error.response);
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return instance;
};

export default useAxiosSecure;

