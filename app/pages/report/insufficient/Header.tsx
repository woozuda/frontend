import { ReactNode } from "react";

export interface InsufficientHeaderProps {
  icon: ReactNode;
  text?: string;
}

const InsufficientHeader = (props: InsufficientHeaderProps) => {
  const { icon, text } = props;
  return (
    <div className="w-full flex items-center h-14">
      <div className="w-12 h-12 flex justify-center items-center">{icon}</div>
      <div className="w-full max-w-[280px] flex items-center rounded-xl bg-app-primary-100 px-5 py-4">
        <p className="text-white text-body2 whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
};

export default InsufficientHeader;
