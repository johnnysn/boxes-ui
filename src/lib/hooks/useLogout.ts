import { useContext } from "react";
import { UserContext } from "../providers/user-context";
import { useNavigate } from "@tanstack/react-router";

export default function useLogout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return () => {
    setUser(null);
    navigate({ to: "/auth" });
  };
}
