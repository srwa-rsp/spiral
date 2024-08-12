import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className=" h-[100dvh]  flex flex-col bg-white md:bg-[url('/login.png')] overflow-y-hidden ">
      <Header />
      <div className="flex basis-1/2 flex-col gap-6 w-full p-8 lg:p-16 justify-center">
        {children}
      </div>
    </div>
  );
};
