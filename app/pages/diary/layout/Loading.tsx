import { HeaderV2 } from "@/components/header/v2";
import GlobalNavigationBar from "@/components/NavigationBar";
import Link from "next/link";
import { PropsWithChildren } from "react";

const LoadingLayout = (props: PropsWithChildren) => {
  return (
    <div className="w-full min-h-full h-auto max-w-[480px] flex flex-col bg-auth bg-cover bg-repeat bg-center bg-sky-950 pb-[70px]">
      <div className="w-full h-full flex flex-col relative">
        <HeaderV2 className="bg-transparent z-20 sticky left-0 top-0 right-0">
          <HeaderV2.Left>
            <Link
              className="p-3 flex justify-center items-center"
              href="/diary"
            >
              <h2 className="text-h2 text-white">다이어리</h2>
            </Link>
          </HeaderV2.Left>
        </HeaderV2>
        <div className="w-full h-full flex flex-col relative">
          <div className="w-full h-px bg-transparent absolute left-0 right-0 top-[-50px]" />
          {props.children}
        </div>
        <div className="w-full max-w-[480px] fixed bottom-0 left-0 right-0 mx-auto z-20">
          <GlobalNavigationBar />
        </div>
      </div>
    </div>
  );
};

export default LoadingLayout;
