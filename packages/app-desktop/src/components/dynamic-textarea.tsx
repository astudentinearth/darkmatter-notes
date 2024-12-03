import { HTMLAttributes, KeyboardEvent } from "react";
import { ChangeEvent, ClipboardEvent, useEffect, useRef } from "react";


export type DynamicTextareaProps = Omit<HTMLAttributes<HTMLTextAreaElement>, "onChange" | "onPaste"> & {
  /** The callback to run when value changes. Height will get adjusted **after** this method is called. */
  onValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Value of the textarea */
  value?: string;
  /** Placeholder of the textarea */
  placeholder?: string;
  /** Whether to allow line breaks in the textarea */
  preventNewline?: boolean;
  defaultValue?: string;
  newLineCallback?: () => void;
}

/**
 * A textarea component which automatically resizes vertically to fit its content.
 */
export default function DynamicTextarea(props: DynamicTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustHeight();
    const resize = () => {
      adjustHeight();
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [props.value]);

  const adjustHeight = () => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
  };

  const handleChange = () => {
    props.onValueChange?.call(null, {
      target: ref.current!,
    } as ChangeEvent<HTMLTextAreaElement>);
    adjustHeight();
  };

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if (!props.preventNewline || !ref.current) return;
    event.preventDefault();
    const paste = event.clipboardData.getData("text");
    const sanitized = paste.replace(/(\r\n|\n|\r)/gm, " ");
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;
    ref.current.value =
      ref.current.value.slice(0, start) +
      sanitized +
      ref.current.value.slice(end);
    ref.current.selectionStart = ref.current.selectionEnd =
      start + sanitized.length;
    handleChange();
  };

  return (
    <textarea
      ref={ref}
      rows={1}
      cols={1}
      {...props}
      onChange={handleChange}
      onPaste={handlePaste}

    ></textarea>
  );
}
