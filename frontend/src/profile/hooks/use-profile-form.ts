import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useApiQuery } from "@/shared/hooks/use-api-query";

export const useProfileForm = <T extends object>(
  queryKey: string,
  id: string,
  endpoint: string,
  formContext: UseFormReturn<T>,
) => {
  const { data, isLoading, isError, refetch } = useApiQuery<{ data: T }>(queryKey, endpoint, id);

  const { reset } = formContext;

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  return { data: data?.data, isLoading, isError, refetch };
};
