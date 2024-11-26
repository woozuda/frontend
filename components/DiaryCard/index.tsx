import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";

export interface DiaryCardProps {
  name: string;
  reflection?: boolean;

  title: string;
  description: string;
  thumbnail?: string;
  className?: string;
}

const REFLECTION = "회고일기";

const DiaryCard = (props: DiaryCardProps) => {
  const { name, title, description, reflection, thumbnail } = props;

  const className = cn(
    props.className,
    "px-5 py-4 flex flex-col w-full min-h-[177px] gap-y-4"
  );

  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between">
        <h5 className="text-sub5 text-app-gray-500">{name}</h5>
        {reflection && (
          <div className="w-[60px] h-[20px] bg-app-primary-400 rounded-[20px] flex justify-center items-center">
            <span className="text-white text-cap1">{REFLECTION}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-y-4">
        <h2 className="text-h2 text-white">{title}</h2>
        {thumbnail && (
          <img
            src={thumbnail}
            className="rounded-sm w-full aspect-square object-cover"
          />
        )}
        <p className="text-app-gray-500 text-body2 line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
