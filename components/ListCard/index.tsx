import { ClassNameLibs } from "@/lib/utils";
import { FormEventHandler, PropsWithChildren } from "react";
import { Checkbox } from "../ui/checkbox";

export interface ListCardHeaderProps {
  title: string;
  reflection?: boolean;
  className?: string;

  checked?: boolean;
  onCheck?: FormEventHandler<HTMLButtonElement>;
}

const ListCardHeaderDefault = (props: ListCardHeaderProps) => {
  const { title, checked, onCheck } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex w-full items-center justify-between"
  );
  return (
    <div className={className}>
      <h2 className="text-white text-h2">{title}</h2>
      {checked !== undefined && (
        <Checkbox checked={checked} onChange={onCheck} />
      )}
    </div>
  );
};

const ListCardHeaderReflection = (props: ListCardHeaderProps) => {
  const { title, checked, onCheck } = props;
  const className = ClassNameLibs.merge(props, "flex flex-col w-full gap-y-4");
  return (
    <div className={className}>
      <div className="w-[60px] h-[20px] rounded-[20px] bg-app-primary-400">
        <span className="text-cap1 text-white">회고일기</span>
      </div>
      <div className="flex w-full items-center justify-between">
        {checked !== undefined && (
          <Checkbox checked={checked} onChange={onCheck} />
        )}
      </div>
      <h2 className="text-white text-h2">{title}</h2>
    </div>
  );
};

export interface ListCardThumbnailProps {
  className?: string;
  thumbnail: string;
}

const ListCardThumbnail = (props: ListCardThumbnailProps) => {
  const className = ClassNameLibs.merge(
    props,
    "w-full aspect-square object-cover"
  );
  return <img className={className} src={props.thumbnail} />;
};

export interface ListCardDescriptionProps {
  className?: string;
  children: string;
}

const ListCardDescription = (props: ListCardDescriptionProps) => {
  const className = ClassNameLibs.merge(
    props,
    "text-app-gray-500 text-body2 line-clamp-3"
  );
  const { children } = props;
  return <p className={className}>{children}</p>;
};

export interface ListCardProps extends PropsWithChildren {
  className?: string;
}
const ListCard = (props: ListCardProps) => {
  const { children } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full gap-y-4 px-5 py-6 opacity-20 bg-app-dim"
  );

  return <section className={className}>{children}</section>;
};

const ListCardHeader = Object.assign(
  {},
  { Default: ListCardHeaderDefault, Reflection: ListCardHeaderReflection }
);

const ListCardCompound = {
  ListCard,
  ListCardHeader,
  ListCardThumbnail,
  ListCardDescription,
};

export default ListCardCompound;
