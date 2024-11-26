import { ClassNameLibs } from "@/lib/utils";
import { ReactNode } from "react";

export interface FloatingActionButtonProps {
  icon?: ReactNode;
  className?: string;
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const className = ClassNameLibs.merge(
    props,
    "w-12 h-12 rounded-3xl flex justify-center items-center bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[90%]"
  );
  const { icon } = props;

  return <button className={className}>{icon}</button>;
};

export { FloatingActionButton };
