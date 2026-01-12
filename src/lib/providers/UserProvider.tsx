import type React from "react";
import { useEffect, useState } from "react";
import { UserContext } from "./user-context";
import type { UserInfo } from "../schemas/user";
import { apiClient } from "../api-client";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (userInfo?.jwt) {
      apiClient.memoryToken = userInfo.jwt;
    } else {
      apiClient.memoryToken = null;
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
