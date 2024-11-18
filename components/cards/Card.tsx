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
    "flex flex-col w-full rounded-lg bg-app-gray-300 gap-y-3 p-4 min-w-[360px]"
  );

  return (
    <section className={className}>
      <NonNull value={diary}>
        {(diary) => {
          return <p className="text-sub4">{diary}</p>;
        }}
      </NonNull>
      <If when={!isReview}>
        <NonNull value={tag}>
          {(tag) => <p className="text-sub4 font-bold">{tag}</p>}
        </NonNull>
      </If>
      <If when={isReview}>
        <div className="flex items-center gap-x-3">
          <p className="text-body3 font-bold">회고</p>
          <NonNull value={tag}>
            {(tag) => <p className="text-sub4 font-bold">{tag}</p>}
          </NonNull>
        </div>
      </If>
      <h3 className="text-h2">{title}</h3>
      <NonNull value={thumbnail}>
        {(thumbnail) => (
          <img
            src={thumbnail}
            alt={title}
            className="h-[170px] w-full rounded-sm object-cover"
          />
        )}
      </NonNull>
      <p className="line-clamp-3 text-body2">{content}</p>
    </section>
  );
};

export default Card;
