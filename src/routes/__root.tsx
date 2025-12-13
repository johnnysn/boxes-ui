import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { UserContext, type UserData } from "../context";

const RootLayout = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext
      value={{
        user: userData,
        setUser: setUserData,
      }}
    >
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper className="px-2 sm:px-4 lg:px-6 py-4">
          <Outlet />
          <TanStackRouterDevtools />
        </Wrapper>
      </main>
    </UserContext>
  );
};

export const Route = createRootRoute({ component: RootLayout });
