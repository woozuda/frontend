import ArrowRightIcon from "@/app/assets/icons/ArrowRightSmall.svg";
import { Retrospect as IRetrospect } from "@/app/models/diary";
import Link from "next/link";

type Props = {
  retrospect: IRetrospect;
  onClickCard: (id: number) => void;
  isSelected: boolean;
};

export default function RetrospectCard({
  retrospect,
  onClickCard,
  isSelected,
}: Props) {
  const handleClick = () => onClickCard(retrospect.retrospectId);

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col gap-4 mt-6 rounded-lg p-4  ${
        isSelected
          ? "bg-app-primary-100 bg-retrospect bg-no-repeat bg-center text-slate-300"
          : `bg-${retrospect.color} `
      }`}
    >
      <div className="flex">
        <div className="text-lg font-bold">{retrospect.retrospectName}</div>
        {isSelected && (
          <div className="ml-auto">
            <Link
              className="flex gap-2"
              href={`/note/retrospect/new/${retrospect.retrospectId}`}
            >
              <span>작성하기</span>
              <ArrowRightIcon />
            </Link>
          </div>
        )}
      </div>
      <div className="text-sm">{retrospect.description}</div>
      {isSelected && (
        <div className="flex flex-wrap gap-2">
          {retrospect.sections.map((section) => (
            <div
              key={section.name}
              className="bg-app-primary-300 rounded-lg p-2 font-bold text-xs text-slate-900"
            >
              {section.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
