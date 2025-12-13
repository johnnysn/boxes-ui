import { createContext } from "react";

export interface UserData {
  name: string;
  email: string;
}

export interface UserContextData {
  user: UserData | null;
  setUser: (data: UserData | null) => void;
}

export const UserContext = createContext<UserContextData>({
  user: null,
  setUser: () => {},
});
