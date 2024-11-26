import { ClassNameLibs, cn } from "@/lib/utils";
import { MouseEvent } from "react";
import { SheetContent, SheetTitle } from "../ui/sheet";

export interface ItemDefault {
  key: string;
  text: string;
}

export interface BottomSheetSelectProps<T extends ItemDefault> {
  className?: string;
  title?: string;
  items: T[];
  itemClassName?: string;
  onClick?: (item: T, index: number, event: MouseEvent<HTMLElement>) => unknown;
}

const BottomSheetSelect = <T extends ItemDefault>(
  props: BottomSheetSelectProps<T>
) => {
  const { title, items, itemClassName, onClick } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full gap-y-3 max-h-[480px]"
  );

  return (
    <SheetContent>
      {title && <SheetTitle>{title}</SheetTitle>}
      <div className={className}>
        {items.map((item, itemIndex) => {
          const className = cn(
            itemClassName,
            "w-full flex justify-center items-center bg-app-gray-200 h-[56px]"
          );
          return (
            <button
              key={item.key}
              className={className}
              onClick={(event) => {
                onClick?.(item, itemIndex, event);
              }}
            >
              <p className="text-sub4 text-app-gray-1100">{item.text}</p>
            </button>
          );
        })}
      </div>
    </SheetContent>
  );
};

export default BottomSheetSelect;
