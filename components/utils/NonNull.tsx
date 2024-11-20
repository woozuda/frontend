import { ReactNode } from "react";

export interface NonNullProps<T> {
  value?: T;
  children: (value: NonNullable<T>) => ReactNode;
}

const NonNull = <T,>(props: NonNullProps<T>) => {
  const { value, children } = props;

  if (value === null || value === undefined) {
    return <></>;
  }
  return children(value);
};

export default NonNull;
