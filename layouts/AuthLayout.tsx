
import  Header  from "@/components/Header/Header";
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
        <div className=" bg-white flex flex-col gap-4 lg:flex-row sm:rounded-2xl text-enable xl:w-9/12 mx-auto w-full">
          <div className="flex basis-1/2 flex-col items-center justify-center gap-6 text-primary lg:border-l p-16">
          <div className="flex basis-1/2 flex-col gap-6 w-full p-8 lg:p-16 justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
