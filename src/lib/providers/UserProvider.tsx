import type React from "react";
import { useEffect, useState } from "react";
import { setApiToken } from "../axios";
import { UserContext } from "./user-context";
import type { UserInfo } from "../schemas/user";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (userInfo?.jwt) {
      setApiToken(userInfo.jwt);
    } else {
      setApiToken(null);
    }
  }, [userInfo]);

  return (
    <UserContext
      value={{
        user: userInfo,
        setUser: setUserInfo,
      }}
    >
      {children}
    </UserContext>
  );
}
