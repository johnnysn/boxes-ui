import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";

const RootLayout = () => (
  <>
    <>
      <header>
        <Navbar />
      </header>
      <main className="px-2 sm:px-4 lg:px-6 py-4 flex justify-center">
        <div className="w-full max-w-5xl">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </main>
    </>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
