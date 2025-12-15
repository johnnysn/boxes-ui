import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../lib/components/Navbar";
import Wrapper from "../lib/components/Wrapper";
import { useState } from "react";
import { UserContext, type UserData } from "../context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
