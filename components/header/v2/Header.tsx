import { ClassNameLibs } from "@/lib/utils";
import { Children, PropsWithChildren } from "react";

export interface HeaderV2Props extends PropsWithChildren {
  className?: string;
}

const HeaderV2LeftItem = (props: PropsWithChildren) => {
  const { children } = props;

  return children;
};

const HeaderV2CenterItem = (props: PropsWithChildren) => {
  const { children } = props;

  return children;
};

const HeaderV2RightItem = (props: PropsWithChildren) => {
  const { children } = props;

  return children;
};

const HeaderV2Container = (props: HeaderV2Props) => {
  const { children } = props;
  const className = ClassNameLibs.merge(
    props,
    "p-1 flex items-center justify-between"
  );
  const components = Children.toArray(children) as JSX.Element[];

  const left = components.find(
    (component) => component.type === (<HeaderV2LeftItem />).type
  );
  const center = components.find(
    (component) => component.type === (<HeaderV2CenterItem />).type
  );
  const right = components.find(
    (component) => component.type === (<HeaderV2RightItem />).type
  );

  return (
    <header className={className}>
      <div className="flex">{left || <></>}</div>
      <div className="flex">{center || <></>}</div>
      <div className="flex">{right || <></>}</div>
    </header>
  );
};

const HeaderV2 = Object.assign(HeaderV2Container, {
  Left: HeaderV2LeftItem,
  Center: HeaderV2CenterItem,
  Right: HeaderV2RightItem,
});

export default HeaderV2;
