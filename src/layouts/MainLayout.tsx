
import  Header  from "@/components/Header/Header";
import { ReactNode } from "react";
interface Props {
  children?: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-full min-h-[100dvh] flex flex-col">
      <Header></Header>
      <main className="h-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
