import Quill, { Delta, EmitterSource, Op, Range } from "quill";
import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import "quill/dist/quill.snow.css";
import "./Editor.css";

type QuillRef = MutableRefObject<Quill | null> | null;
type ContainerRef = MutableRefObject<HTMLDivElement | null>;

export interface EditorProps {
  readOnly: boolean;
  defaultValue: Delta | Op[];
  onTextChange: (
    delta: Delta,
    oldContent: Delta,
    source: EmitterSource
  ) => unknown;
  onSelectionChange: (
    range: Range,
    oldRange: Range,
    source: EmitterSource
  ) => unknown;
}

const Editor = forwardRef<Quill, EditorProps>(function Editor(
  { readOnly, defaultValue, onTextChange, onSelectionChange },
  ref
) {
  const containerRef: ContainerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    (ref as QuillRef)?.current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    if (containerRef.current !== null) {
      const editorContainer = containerRef.current.appendChild(
        containerRef.current.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      if (ref !== null) {
        (ref as NonNullable<QuillRef>).current = quill;

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });
      }
    }

    return () => {
      if (ref !== null) {
        (ref as NonNullable<QuillRef>).current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [ref]);

  return <div className="w-full h-full flex flex-col" ref={containerRef}></div>;
});

export default Editor;
