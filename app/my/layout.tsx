import GlobalNavigationBar from "@/components/NavigationBar";
import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren {
  params: Promise<{ id: number }>;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950 text-white pb-[70px]">
      {children}
      <Toaster />
      <div className="w-full max-w-[480px] fixed bottom-0 left-0 right-0 mx-auto z-20">
        <GlobalNavigationBar className="shrink-0" />
      </div>
    </div>
  );
}
