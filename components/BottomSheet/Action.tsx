import { ClassNameLibs, cn } from "@/lib/utils";
import { MouseEventHandler } from "react";
import { SheetContent, SheetTitle } from "../ui/sheet";

type ButtonAction = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export interface BottomSheetActionProps {
  title?: string;
  className?: string;
  primary?: ButtonAction;
  cancel?: ButtonAction;
}

const BottomSheetAction = (props: BottomSheetActionProps) => {
  const { title, primary, cancel } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full gap-y-3 max-h-[480px]"
  );
  const primaryClassName = cn(
    primary?.className,
    "rounded-md bg-app-gray-1100 text-app-gray-100 text-sub4"
  );
  const cancelClassName = cn(
    primary?.className,
    "rounded-md bg-app-gray-1100 text-app-gray-100 text-sub4"
  );

  return (
    <SheetContent className={className}>
      {title && <SheetTitle>{title}</SheetTitle>}
      <div className="w-full flex items-center gap-x-2">
        {primary && (
          <button onClick={primary.onClick} className={primaryClassName}>
            {primary.text}
          </button>
        )}
        {cancel && (
          <button onClick={cancel.onClick} className={cancelClassName}>
            {cancel.text}
          </button>
        )}
      </div>
    </SheetContent>
  );
};

export default BottomSheetAction;
