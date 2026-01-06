import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../http/postLogin";
import useAuthStore from "../store/useAuthStore";

export const useLoginMutation = () => {
  const authStore = useAuthStore();

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      authStore.setUser(data.data.user);
      localStorage.setItem("token", data.data.token);
    },
  });

  return mutation;
};
