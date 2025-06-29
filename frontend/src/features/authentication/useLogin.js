import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
  console.log("I am in useLogin");
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    queryKey: ["login"],
    mutationFn: loginApi,
    onSuccess: (data) => {
      //TODO: Save the user in the state
      console.log("data:", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
      toast.success("Login Success !");
      // return { login, isLoading, data };
    },
    onError: (error) => {
      toast.error("Login Error. Please try again!", error);
    },
  });

  return { login, isLoading };
}
