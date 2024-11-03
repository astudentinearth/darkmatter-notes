import { ChangeEvent, useEffect, useRef } from "react";

/**
 * A textarea component which automatically resizes vertically to fit its content.
 */
export default function DynamicTextarea(props: {
    /** HTML `className` attribute */
    className?: string;
    /** The callback to run when value changes. Height will get adjusted **after** this method is called. */
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Value of the textarea */
    value?: string;
    /** Placeholder of the textarea */
    placeholder?: string;
    /** Whether to allow line breaks in the textarea */
    preventNewline?: boolean;
    defaultValue?: string;
}) {
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
        props.onChange?.call(null, {
            target: ref.current!,
        } as ChangeEvent<HTMLTextAreaElement>);
        adjustHeight();
    };

    return (
        <textarea
            ref={ref}
            rows={1}
            cols={1}
            className={props.className}
            value={props.value}
            onChange={handleChange}
            defaultValue={props.defaultValue}
            onKeyDown={(e) => {
                if (props.preventNewline && e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        ></textarea>
    );
}
