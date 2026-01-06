import httpService from "../../../services/httpService";
import type { Customer } from "../customer.model";

export interface PostCustomerInput {
  email: string;
  name: string;
  country: string;
  age: number;
}

export interface PostCustomerOutput {
  data: Customer;
}

export const postCustomer = async (
  data: PostCustomerInput
): Promise<PostCustomerOutput> => {
  const response = await httpService.post<PostCustomerOutput>(
    "/customers",
    data
  );

  return response.data;
};
