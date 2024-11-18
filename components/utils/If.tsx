import { PropsWithChildren } from "react";

export interface IfProps extends PropsWithChildren {
  when?: boolean;
}

const If = (props: IfProps) => {
  const { when = false, children } = props;

  if (!when) {
    return <></>;
  }
  return children;
};

export default If;
