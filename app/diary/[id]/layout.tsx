import { cloneElement, PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
  return cloneElement(props.children as JSX.Element);
}
