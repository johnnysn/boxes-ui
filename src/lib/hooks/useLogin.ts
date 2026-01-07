import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../providers/user-context";
import { useNavigate } from "@tanstack/react-router";
import { signin } from "../services/user-services";

export function useLogin() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signin,
    onSuccess: (userInfo) => {
      setUser(userInfo);

      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Falha no login:", error);

      setUser(null);
    },
  });
}
