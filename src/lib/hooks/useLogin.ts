import { useMutation } from "@tanstack/react-query";
import { api, STORAGE_KEY } from "../axios";
import { useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate } from "@tanstack/react-router";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
  name: string;
  email: string;
}

export function useLogin() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<LoginResponse>(
        "/auth/signin",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      // Salva o PRIMEIRO token recebido no login
      localStorage.setItem(STORAGE_KEY, data.jwt);
      setUser({
        name: data.name,
        email: data.email,
      });

      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Falha no login:", error);

      setUser(null);
    },
  });
}
