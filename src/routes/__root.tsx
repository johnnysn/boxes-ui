import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../lib/components/Navbar";
import Wrapper from "../lib/components/Wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "../lib/providers/UserProvider";
import ToastProvider from "../lib/providers/toast-provider";
import { ApiClientConfig } from "./-config/ApiClientConfig";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastProvider>
          <ApiClientConfig />
          <header>
            <Navbar />
          </header>
          <main>
            <Wrapper className="px-2 sm:px-4 lg:px-6 py-4">
              <Outlet />
              <TanStackRouterDevtools />
            </Wrapper>
          </main>
        </ToastProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
