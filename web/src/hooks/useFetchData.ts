import { useQuery } from "react-query";
import axiosInstance from "../lib/axios";

const useFetchData = (endpoint: string, queryKey: string) => {
  return useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(endpoint);
    return data;
  });
};

export default useFetchData;
