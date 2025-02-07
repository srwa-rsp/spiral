import Header from "@/components/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import spiralV from '@/assets/images/Spiral-Vertical.svg'
import spiral from '@/assets/images/Big-Spiral.svg'

interface Props {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <div className=" h-[100dvh]  flex flex-col bg-white relative">
      <Header />
      <div className="flex flex-col gap-6 w-full p-8 lg:p-16 justify-center">
        {children}
        <Image width={300} src={spiralV} alt={"spiral"} priority className="absolute bottom-0 right-10 " />
        <Image width={300} src={spiral} alt={"spiral"} priority className="absolute top-0 left-0" />
      </div>
    </div>
  );
};
