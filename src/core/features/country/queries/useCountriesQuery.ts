import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../http/getCountries";

export const useCountriesQuery = () => {
  const mutation = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return mutation;
};
