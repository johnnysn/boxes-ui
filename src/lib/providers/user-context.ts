import { createContext } from "react";
import type { UserInfo } from "../schemas/user";

export interface UserContextData {
  user: UserInfo | null;
  setUser: (data: UserInfo | null) => void;
}

export const UserContext = createContext<UserContextData>({
  user: null,
  setUser: () => {},
});
