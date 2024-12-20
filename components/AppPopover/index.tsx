import { ClassNameLibs } from "@/lib/utils";
import Link from "next/link";
import {
  Children,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface PopoverItem {
  name: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
}

export interface AppPopoverProps extends PropsWithChildren {
  className?: string;
}

export interface AppPopoverIconProps {
  icon?: ReactNode;
  className?: string;
}

const AppPopoverIcon = (props: AppPopoverIconProps) => {
  const className = ClassNameLibs.merge(
    props,
    "w-12 h-12 rounded-3xl flex justify-center items-center bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[-10%]"
  );

  return (
    <PopoverTrigger asChild>
      <button className={className}>{props.icon}</button>
    </PopoverTrigger>
  );
};

export interface AppPopoverItemProps {
  name?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

const AppPopoverItem = (props: AppPopoverItemProps) => {
  const { href, onClick, name, icon } = props;
  if (!href && !onClick) {
    throw new Error("Href or onClick function should not be null neither.");
  }
  if (href) {
    return (
      <Link
        key={name}
        className="w-full h-14 flex justify-start items-center text-white gap-x-2.5 pl-3"
        href={href}
      >
        <span className="text-app-gray-300">{icon}</span>
        <span className="text-app-gray-300 text-sub4">{name}</span>
      </Link>
    );
  } else {
    return (
      <button
        key={name}
        onClick={onClick}
        className="w-full h-14 flex justify-start items-center text-white gap-x-2.5 pl-3"
      >
        <span className="text-app-gray-300">{icon}</span>
        <span className="text-app-gray-300 text-sub4">{name}</span>
      </button>
    );
  }
};

const AppPopoverContainer = (props: AppPopoverProps) => {
  const components = Children.toArray(props.children);
  const icon = components.find(
    (comp) => (comp as JSX.Element).type === (<AppPopoverIcon />).type
  );
  const items = components.filter(
    (comp) => (comp as JSX.Element).type === (<AppPopoverItem />).type
  );

  return (
    <Popover>
      {icon}
      <PopoverContent
        className="w-[200px] bg-app-gray-1200 rounded-xl p-0 mb-3"
        align="end"
      >
        <div className="flex flex-col w-full px-5 py-4">{items}</div>
      </PopoverContent>
    </Popover>
  );
};

const AppPopover = Object.assign(AppPopoverContainer, {
  Icon: AppPopoverIcon,
  Item: AppPopoverItem,
});

export default AppPopover;
