import { ClassNameLibs, cn } from "@/lib/utils";
import { MouseEvent } from "react";
import { SheetClose, SheetContent, SheetTitle } from "../ui/sheet";

export interface ItemDefault {
  key: string;
  text: string;
}

export interface BottomSheetSelectProps<T extends ItemDefault> {
  className?: string;
  title?: string;
  items: T[];
  itemClassName?: string;
  side?: "top" | "bottom" | "left" | "right";
  onClick?: (item: T, index: number, event: MouseEvent<HTMLElement>) => unknown;
}

const BottomSheetSelect = <T extends ItemDefault>(
  props: BottomSheetSelectProps<T>
) => {
  const { title, items, itemClassName, side, onClick } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full gap-y-3 max-h-[480px]"
  );

  return (
    <SheetContent side={side}>
      {title && <SheetTitle>{title}</SheetTitle>}
      <div className={className}>
        {items.map((item, itemIndex) => {
          const className = cn(
            "w-full flex justify-center items-center bg-app-gray-200 h-[56px]",
            itemClassName
          );
          return (
            <SheetClose key={item.key}>
              <div
                className={className}
                onClick={(event) => {
                  onClick?.(item, itemIndex, event);
                }}
              >
                <p className="text-sub4 text-app-gray-1100">{item.text}</p>
              </div>
            </SheetClose>
          );
        })}
      </div>
    </SheetContent>
  );
};

export default BottomSheetSelect;
