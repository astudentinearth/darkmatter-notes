import { cn } from "@renderer/lib/utils";

export const FlexibleSpacer = (props: {
    className?: string;
    axis?: "horizontal" | "vertical";
}) => (
    <div
        className={cn(
            "flex-grow",
            props.axis === "vertical" ? "h-full" : "w-full",
            props.className,
        )}
    ></div>
);
