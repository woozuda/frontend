import Quill, { Delta } from "quill";
import { useEffect, useRef } from "react";

export interface ClipBoardProps {
  html: string;
  onChange: (delta: Delta) => unknown;
}

const ClipBoard = (props: ClipBoardProps) => {
  const ref = useRef(null as HTMLDivElement | null);
  const { html, onChange } = props;
  useEffect(() => {
    if (ref.current) {
      const delta = new Quill(ref.current).clipboard.convert({ html });
      onChange?.(delta);
    }
  }, [html, onChange]);
  return (
    <div
      ref={(element) => {
        ref.current = element;
      }}
      className="!w-0 !h-0 flex shrink-0 invisible overflow-hidden"
    ></div>
  );
};

export default ClipBoard;
