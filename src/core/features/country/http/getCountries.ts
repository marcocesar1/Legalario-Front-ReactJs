import httpService from "../../../services/httpService";

export interface GetCustomersOutput {
  data: string[];
}

export const getCountries = async (): Promise<GetCustomersOutput> => {
  const response = await httpService.get<GetCustomersOutput>("/countries");

  console.log("data", response.data);

  return response.data;
};
