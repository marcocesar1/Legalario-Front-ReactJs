import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCustomer } from "../http/postCustomer";

export const useCustomerMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

  return mutation;
};
