import { cn } from "@/lib/utils";
import { If } from "../utils";

export interface CardLoadingProps {
  diary?: boolean;
  tag?: boolean;
  isReview?: boolean;
  thumbnail?: boolean;

  className?: boolean;
}

const CardLoading = (props: CardLoadingProps) => {
  const { diary, tag, isReview, thumbnail } = props;

  const className = cn(
    props.className,
    "flex flex-col w-full rounded-lg bg-gray-300 gap-y-3 p-4 min-w-[360px]"
  );

  return (
    <section className={className}>
      <If when={diary}>
        <div className="w-[80px] h-4 bg-gray-400 animate-pulse" />
      </If>
      <If when={!isReview}>
        <If when={tag}>
          <div className="w-20 h-4 bg-gray-400 animate-pulse" />
        </If>
      </If>
      <If when={isReview}>
        <div className="flex items-center gap-x-3">
          <p className="text-base font-bold">회고</p>
          <If when={tag}>
            <div className="w-20 h-4 bg-gray-400 animate-pulse" />
          </If>
        </div>
      </If>
      <div className="w-[300px] h-5 bg-gray-400 animate-pulse" />
      <If when={thumbnail}>
        <div className="w-full h-[160px] bg-gray-400 animate-pulse rounded-sm" />
      </If>
      <div className="flex flex-col w-full gap-y-1">
        <div className="w-full h-5 bg-gray-400 animate-pulse" />
        <div className="w-full h-5 bg-gray-400 animate-pulse" />
        <div className="w-full h-5 bg-gray-400 animate-pulse" />
      </div>
    </section>
  );
};

export default CardLoading;
