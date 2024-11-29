import { ForwardedRef } from "react";

export class RefLibs {
  static connect<E extends HTMLElement>(ref: ForwardedRef<E>) {
    return (element: E) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref !== null && ref !== undefined) {
        ref.current = element;
      }
    };
  }
}
