import { ClassNameLibs } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export interface AddDiaryProps {
  className?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
}

const AddDiary = (props: AddDiaryProps) => {
  const { icon, onClick } = props;
  const className = ClassNameLibs.merge(
    props,
    "w-[224px] h-[256px] rounded-lg bg-app-gray-200 bg-opacity-10 flex justify-center items-center border-0"
  );

  return (
    <Card className={className} role="button" onClick={onClick}>
      <CardContent className="w-12 h-12 bg-app-gray-600 rounded-[50px] flex justify-center items-center p-0">
        {icon}
      </CardContent>
    </Card>
  );
};

export default AddDiary;
