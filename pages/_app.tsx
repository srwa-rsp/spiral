import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import {NextUIProvider} from '@nextui-org/react'


import "@/styles/globals.css";
import type { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UnProtectedRoutes: string[] = [`/auth/login`, "/auth/register"];
const PublicRoutes: string[] = ["/home"];
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
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
        <NextUIProvider>
        <>
          {UnProtectedRoutes.includes(router.pathname) ? (
            <AuthLayout>{page}</AuthLayout>
          ) : PublicRoutes.includes(router.pathname) ? (
            <MainLayout>{page}</MainLayout>
          ) : (
            <MainLayout>{page}</MainLayout>
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            rtl={true}
            theme="light"
            hideProgressBar={false}
            bodyClassName="font-[yekanbakh] text-[1.4rem]"
          />
        </>
        </NextUIProvider>
      );
    };
  return getLayout(<Component {...pageProps} />);
};

export default App;
