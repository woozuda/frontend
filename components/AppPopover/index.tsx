import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface PopoverItem {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface AppPopoverProps {
  items?: PopoverItem[];
  buttonIcon: ReactNode;
  className?: string;
}

const AppPopover = (props: AppPopoverProps) => {
  const { items, buttonIcon } = props;
  const className = ClassNameLibs.merge(
    props,
    "w-12 h-12 rounded-3xl flex justify-center items-center bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[-10%]"
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={className}>{buttonIcon}</button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] bg-app-gray-1200 rounded-xl p-0 mb-3"
        align="end"
      >
        <div className="flex flex-col w-full px-5 py-4">
          {items?.map((item) => {
            return (
              <Link
                key={item.name}
                className="w-full h-14 flex justify-start items-center text-white gap-x-2.5 pl-3"
                href={item.href}
              >
                <span className="text-app-gray-300">{item.icon}</span>{" "}
                <span className="text-app-gray-300 text-sub4">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
