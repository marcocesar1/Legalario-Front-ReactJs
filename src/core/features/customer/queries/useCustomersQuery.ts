import { useQuery } from "@tanstack/react-query";
import { getCustomers, type GetCustomersInput } from "../http/getCustomers";

export const useCustomersQuery = (filters: GetCustomersInput) => {
  const mutation = useQuery({
    queryKey: ["customers", filters],
    queryFn: () => getCustomers(filters),
  });

  return mutation;
};
