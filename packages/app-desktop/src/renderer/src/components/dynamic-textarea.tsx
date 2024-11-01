import { ChangeEvent, useEffect, useRef } from "react";

/**
 * A textarea cmponent which automatically resizes vertically to fit its content.
 */
export default function DynamicTextarea(props: {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    placeholder?: string;
    preventNewline?: boolean;
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

    const adjustHeight = () => {
        if (!ref.current) return;
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight + 2}px`;
    };

    const handleChange = () => {
        adjustHeight();
        props.onChange?.call(null, {
            target: ref.current!,
        } as ChangeEvent<HTMLTextAreaElement>);
    };

    return (
        <textarea
            ref={ref}
            rows={1}
            cols={1}
            className={props.className}
            value={props.value}
            onChange={handleChange}
            onKeyDown={(e) => {
                if (props.preventNewline && e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        ></textarea>
    );
}
