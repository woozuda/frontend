import { ReactNode } from "react";

export interface InsufficientItemProps {
  icon?: ReactNode;
  text?: string;
}

const InsufficientItem = (props: InsufficientItemProps) => {
  const { icon, text } = props;
  return (
    <div className="flex justify-end w-full items-center gap-x-2">
      <div className="h-14 px-5 py-4 flex items-center justify-center bg-gradient-to-r from-gradient-02-100 to-gradient-02-200 rounded-xl">
        <p className="text-white text-body2">{text}</p>
      </div>
      <div className="w-12 h-12 flex justify-center items-center">{icon}</div>
    </div>
  );
};

export default InsufficientItem;
