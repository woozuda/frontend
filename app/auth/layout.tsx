import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner"

export interface LayoutProps extends PropsWithChildren {
    params: Promise<{ id: number }>;
}

export default function Layout(props: LayoutProps) {
    const { children } = props;
    return (
        <div className="w-full h-full max-w-[480px] flex flex-col bg-auth bg-cover bg-no-repeat bg-center bg-sky-950 text-white">
            {children}
            <Toaster />
        </div>
    )
}