import { RefLibs } from "@/app/lib/ref";
import { ClassNameLibs } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

export interface FloatingActionButtonProps {
  icon?: ReactNode;
  className?: string;
}

const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(function FloatingActionButton(props, ref) {
  const className = ClassNameLibs.merge(
    props,
    "w-12 h-12 rounded-3xl flex justify-center items-center bg-gradient-to-r from-gradient-01-100 to-gradient-01-200 from-[-10%]"
  );
  const { icon } = props;

  return (
    <button className={className} ref={RefLibs.connect(ref)}>
      {icon}
    </button>
  );
});

export { FloatingActionButton };
