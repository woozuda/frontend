import { ClassNameLibs } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Checkbox } from "../ui/checkbox";

export interface ListCardHeaderProps {
  title: string;
  reflection?: boolean;
  className?: string;

  checked?: boolean;
  hasCheckbox?: boolean;
  onCheck?: (checkedState: boolean) => unknown;
}

const ListCardHeaderDefault = (props: ListCardHeaderProps) => {
  const { title, checked, hasCheckbox, onCheck } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex w-full items-center justify-between"
  );
  return (
    <div className={className}>
      <h2 className="text-white text-h2">{title}</h2>
      {hasCheckbox && (
        <Checkbox
          checked={checked}
          onCheckedChange={onCheck}
          className="border-white"
        />
      )}
    </div>
  );
};

const ListCardHeaderReflection = (props: ListCardHeaderProps) => {
  const { title, checked, hasCheckbox, onCheck } = props;
  const className = ClassNameLibs.merge(props, "flex flex-col w-full gap-y-4");
  return (
    <div className={className}>
      <div className="flex justify-between items-center w-full">
        <div className="w-[60px] h-[20px] rounded-[20px] bg-app-primary-400 flex justify-center items-center">
          <span className="text-cap1 text-white">회고일기</span>
        </div>

        {hasCheckbox && (
          <Checkbox
            checked={checked}
            onCheckedChange={onCheck}
            className="border-white"
          />
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
    "text-body2 line-clamp-3 text-white"
  );
  const { children } = props;
  return <p className={className}>{children}</p>;
};

export interface ListCardProps extends PropsWithChildren {
  className?: string;
}
const ListCardContainer = (props: ListCardProps) => {
  const { children } = props;
  const className = ClassNameLibs.merge(
    props,
    "flex flex-col w-full gap-y-4 px-5 py-6 bg-opacity-20 bg-app-dim rounded-xl"
  );

  return <section className={className}>{children}</section>;
};

const ListCardHeader = Object.assign(
  {},
  { Default: ListCardHeaderDefault, Reflection: ListCardHeaderReflection }
);

const ListCard = Object.assign(
  {},
  {
    Container: ListCardContainer,
    Header: ListCardHeader,
    Thumbnail: ListCardThumbnail,
    Description: ListCardDescription,
  }
);

export default ListCard;
