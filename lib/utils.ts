import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HasClassName {
  className?: string;
}

export class ClassNameLibs {
  static merge(props: HasClassName, className?: string) {
    return cn(props.className, className);
  }
}
