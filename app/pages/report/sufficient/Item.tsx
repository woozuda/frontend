import { PolygonSvg } from "@/app/assets/icons";
import { ReactNode } from "react";

export interface SufficientItemProps {
  text?: string;
  icon?: ReactNode;
}

const SufficientItem = (props: SufficientItemProps) => {
  const { text, icon } = props;

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col gap-y-2 items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center px-5 py-3 rounded-xl bg-gradient-to-r from-gradient-02-100 to-gradient-02-200">
            <p className="text-white text-body2 font-bold">{text}</p>
          </div>
          <PolygonSvg />
        </div>
        <div className="flex justify-center">{icon}</div>
      </div>
    </div>
  );
};

export default SufficientItem;
