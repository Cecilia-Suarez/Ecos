import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../utils/axios-instance";

export const useApiQuery = <T>(
  key: string,
  url: string,
  id?: string,
): UseQueryResult<T, AxiosError> => {
  return useQuery<T, AxiosError>({
    queryKey: [key, id],
    queryFn: async () => {
      const { data } = await api.get<T>(url);
      return data;
    },
  });
};
