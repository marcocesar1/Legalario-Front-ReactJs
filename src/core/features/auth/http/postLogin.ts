import httpService from "../../../services/httpService";
import type { User } from "../../user/user.model";

export interface PostLoginInput {
  email: string;
  password: string;
}

export interface PostLoginOutput {
  data: {
    token: string;
    user: User;
  };
}

export const postLogin = async (
  data: PostLoginInput
): Promise<PostLoginOutput> => {
  const response = await httpService.post<PostLoginOutput>("/auth/login", data);

  return response.data;
};
