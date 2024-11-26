import { AppButtonEnumLibs, AppButtonType } from "@/app/lib/button";
import { cn } from "@/lib/utils";
import { MouseEventHandler, PropsWithChildren } from "react";
import { Button } from "../ui/button";

export interface AppButtonProps extends PropsWithChildren {
  className?: string;
  type?: AppButtonType;

  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const AppButton = (props: AppButtonProps) => {
  const { type = AppButtonType.DEFAULT, onClick, children } = props;
  const className = cn(
    props.className,
    "flex justify-center items-center",
    AppButtonEnumLibs.getStyle(type)
  );

  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export default AppButton;
