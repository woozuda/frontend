import { cn } from "@/lib/utils";
import { If, NonNull } from "../utils";

export interface CardProps {
  diary?: string;
  tag?: string;
  isReview?: boolean;
  thumbnail?: string;

  className?: string;

  title: string;
  content: string;
}

const Card = (props: CardProps) => {
  const { diary, tag, isReview, thumbnail, title, content } = props;

  const className = cn(
    props.className,
    "flex flex-col w-full rounded-lg bg-gray-300 gap-y-3 p-4 min-w-[360px]"
  );

  return (
    <section className={className}>
      <NonNull value={diary}>
        {(diary) => {
          return <p className="text-base font-bold">{diary}</p>;
        }}
      </NonNull>
      <If when={!isReview}>
        <NonNull value={tag}>
          {(tag) => <p className="text-base font-bold">{tag}</p>}
        </NonNull>
      </If>
      <If when={isReview}>
        <div className="flex items-center gap-x-3">
          <p className="text-base font-bold">회고</p>
          <NonNull value={tag}>
            {(tag) => <p className="text-base font-bold">{tag}</p>}
          </NonNull>
        </div>
      </If>
      <h3 className="text-2xl font-bold">{title}</h3>
      <NonNull value={thumbnail}>
        {(thumbnail) => (
          <img
            src={thumbnail}
            alt={title}
            className="h-[170px] w-full rounded-sm"
          />
        )}
      </NonNull>
      <p className="line-clamp-3 text-base font-medium">{content}</p>
    </section>
  );
};

export default Card;
