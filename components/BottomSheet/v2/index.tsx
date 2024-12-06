import { SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Children, PropsWithChildren } from "react";

export interface BottomSheetV2Props extends PropsWithChildren {
  className?: string;
}

export interface BottomSheetV2HeaderProps extends PropsWithChildren {
  className?: string;
}

export interface BottomSheetV2ButtonProps extends PropsWithChildren {
  className?: string;
}

export interface BottomSheetV2OptionProps extends PropsWithChildren {
  className?: string;
}

const BottomSheetV2Header = (props: BottomSheetV2HeaderProps) => {
  const { children } = props;
  const className = cn("flex items-center", props.className);
  return <div className={className}>{children}</div>;
};

const BottomSheetV2Button = (props: BottomSheetV2ButtonProps) => {
  const { children } = props;

  return children;
};

const BottomSheetV2Option = (props: BottomSheetV2OptionProps) => {
  const { children } = props;

  return children;
};

const BottomSheetV2Container = (props: BottomSheetV2Props) => {
  const { children } = props;
  const className = cn(
    "flex flex-col w-full px-5 py-6 gap-y-8 data-[state=closed]:duration-100",
    props.className
  );

  const components = Children.toArray(children);
  const header = components.find(
    (comp) => (comp as JSX.Element).type === (<BottomSheetV2Header />).type
  );
  const buttons = components.filter(
    (comp) => (comp as JSX.Element).type === (<BottomSheetV2Button />).type
  );
  const options = components.filter(
    (comp) => (comp as JSX.Element).type === (<BottomSheetV2Option />).type
  );

  return (
    <SheetContent className={className} side={"bottom"}>
      {header}
      {buttons.length > 0 && (
        <div className="pb-3 flex items-center gap-x-2">{buttons}</div>
      )}
      {options.length > 0 && (
        <div className="flex flex-col w-full max-h-[460px] overflow-y-scroll scrollbar-hide pb-3 gap-y-3">
          {options}
        </div>
      )}
    </SheetContent>
  );
};

const BottomSheetV2 = Object.assign(BottomSheetV2Container, {
  Header: BottomSheetV2Header,
  Button: BottomSheetV2Button,
  Option: BottomSheetV2Option,
});

export default BottomSheetV2;
