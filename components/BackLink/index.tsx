"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export interface BackLinkProps extends PropsWithChildren {
  className?: string;
}

const BackLink = (props: BackLinkProps) => {
  const { children } = props;
  const router = useRouter();
  return (
    <button className={props.className} onClick={() => router.back()}>
      {children}
    </button>
  );
};

export default BackLink;
