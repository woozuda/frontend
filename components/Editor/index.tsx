import dynamic from "next/dynamic";
import Quill from "quill";
import { LegacyRef } from "react";
import { EditorProps } from "./Editor";

const QuillEditor = dynamic(
  async () => {
    const { default: EditorModule } = await import("./Editor");

    return function Editor({
      forwardedRef,
      ...props
    }: EditorProps & { forwardedRef: LegacyRef<Quill> }) {
      return <EditorModule ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
const ClipBoard = dynamic(() => import("./ClipBoard"));

export { ClipBoard };

export default QuillEditor;
