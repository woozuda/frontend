import { Diary } from "@/app/models/diary";
import { ClassNameLibs } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent } from "../ui/card";

export interface DiaryCardProps {
  diary: Diary;
  className?: string;
}

const DiaryCard = (props: DiaryCardProps) => {
  const {
    diary: { title, subject, startDate, endDate, noteCount, imgUrl },
  } = props;
  const className = ClassNameLibs.merge(
    props,
    "h-[320px] flex items-end relative shrink-0 border-0 w-[280px]"
  );
  const period = `${format(startDate, "yyyy.MM.dd")}~${format(
    endDate,
    "yyyy.MM.dd"
  )}`;

  return (
    <Card className={className}>
      <CardContent className="w-full flex relative p-5 z-10 backdrop-blur rounded-b-lg">
        <div className="absolute w-full h-full bg-white top-0 left-0 rounded-b-lg bg-opacity-10" />
        <div className="w-full flex flex-col gap-y-3 relative">
          <h2 className="text-sub2 text-white">{title}</h2>
          <div className="flex gap-x-2 items-center line-clamp-1">
            {subject.map((tag) => {
              return (
                <p key={tag} className="text-body2 text-white">
                  #{tag}
                </p>
              );
            })}
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <p className="text-app-gray-600 text-cap1">{period}</p>
            <p className="text-app-gray-600 text-cap1">일기 {noteCount}개</p>
          </div>
        </div>
      </CardContent>
      <img
        className="absolute w-full h-full top-0 left-0 rounded-lg"
        src={imgUrl}
      />
    </Card>
  );
};

export default DiaryCard;
