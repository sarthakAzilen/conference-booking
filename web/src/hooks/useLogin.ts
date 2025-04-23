import { useMutation } from "react-query";
import axiosInstance from "../lib/axios";

export const useLogin = () => {
  return useMutation(
    async (credentials: { username: string; password: string }) => {
      const { data } = await axiosInstance.post("/login", credentials);
      return data;
    }
  );
};
