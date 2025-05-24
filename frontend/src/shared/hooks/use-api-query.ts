import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../utils/axios-instance";

export const useApiQuery = <T>(
  key: string,
  url: string,
  id?: string,
  enabled = true,
): UseQueryResult<T | undefined, AxiosError> => {
  return useQuery<T | undefined, AxiosError>({
    queryKey: [key, id],
    queryFn: async () => {
      try {
        const { data } = await api.get<T>(url);
        return data;
      } catch (error) {
        console.error("Error en la API:", error);
        return undefined;
      }
    },
    enabled,
  });
};
