import httpService from "../../../services/httpService";
import type { Pagination } from "../../../types/pagination";
import type { Customer } from "../customer.model";

export interface GetCustomersInput {
  search: string;
  country: string;
  page: number;
  per_page: number;
}

export interface GetCustomersOutput {
  data: Customer[];
  metadata: Pagination;
}

export const getCustomers = async (
  data: GetCustomersInput
): Promise<GetCustomersOutput> => {
  const response = await httpService.get<GetCustomersOutput>("/customers", {
    params: data,
  });

  return response.data;
};
