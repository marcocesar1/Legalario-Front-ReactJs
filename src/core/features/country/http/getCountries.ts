import httpService from "../../../services/httpService";
import type { Country } from "../country.model";

export interface GetCustomersOutput {
  data: Country[];
}

export const getCountries = async (): Promise<GetCustomersOutput> => {
  const response = await httpService.get<GetCustomersOutput>("/countries");

  console.log("data", response.data);

  return response.data;
};
