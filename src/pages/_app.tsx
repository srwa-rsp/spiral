import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";
import type { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthCheck from "@/utils/authCheck";

const AuthRoutes: string[] = [`/auth/login`, "/auth/register"];
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
  }, []);

  const getLayout =
    Component.getLayout ||
    function (page: ReactNode) {
      return (
        <SessionProvider session={session}>
          <NextUIProvider>
            <>
              {AuthRoutes.includes(router.pathname) ? (
                <AuthLayout>{page}</AuthLayout>
              ) : Component.auth ? (
                <AuthCheck>
                  <MainLayout>{page}</MainLayout>
                </AuthCheck>
              ) : (
                <MainLayout>{page}</MainLayout>
              )}
              <ToastContainer
                position="top-center"
                autoClose={5000}
                closeOnClick
                theme="light"
                hideProgressBar={false}
                bodyClassName="font-[nunito] text-[1rem]"
              />
            </>
          </NextUIProvider>
        </SessionProvider>
      );
    };
  return getLayout(<Component {...pageProps} />);
};

export default App;
