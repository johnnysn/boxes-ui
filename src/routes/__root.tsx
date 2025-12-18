import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../lib/components/Navbar";
import Wrapper from "../lib/components/Wrapper";
import { useEffect, useState } from "react";
import { UserContext } from "../context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadUser } from "../lib/services/user-services";
import type { UserInfo } from "../lib/schemas/user";

const queryClient = new QueryClient();

const RootLayout = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (userInfo === null) {
      async function retrieveUserInfo() {
        const info = await loadUser();

        if (info) setUserInfo(info);
      }

      console.log("Retrieving user info");
      retrieveUserInfo();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext
        value={{
          user: userInfo,
          setUser: setUserInfo,
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
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
