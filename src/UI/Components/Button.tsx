/** Button general properties */
export interface ButtonProps{
    /** Defines the color style - */
    color?: ButtonColor
    /** Text content to be shown */
    textContent: string
    /** Optional icon class name (bootstrap icons) */
    icon?: string
    /** Button geometry */
    shape?: ButtonShape
    /** Button width (default fits content) */
    width?: number | "auto"
    /** Button height (default fits content) */
    height?: number | "auto"
    /** Click event handler */
    onClick?: ()=>void 
}

/** Coloring options for buttons */
export enum ButtonColor{
    /** Use accent color for background. Text color is white. */
    Accent = 1,
    /** Use default background color. Text color is defined by theme. */
    Default = 0
}

/** Shapes for a button */
export enum ButtonShape{
    /** Button without border radius */
    Square = 0,
    /** Button with 8px border radius */
    Round8 = 8,
    /** Button with 12px border radius */
    Round12 = 12,
    /** Button with 16px border radius */
    Round16 = 16,
    /** Button with a pill shape (999px border radius) */
    RoundFull = 999
}

/** Generates appropriate button styles from given properties */
function GenerateButtonStyle(props: ButtonProps) : React.CSSProperties{
    let style = { } as React.CSSProperties;
    if (props.color == null || props.color===ButtonColor.Default){ 
        style.background="rgba(var(--background-secondary) / 1)";
    }
    else {
        style.background="rgba(var(--accent) / 1)";
        style.color="#FFFFFF";
    }
    if (props.shape == null) style.borderRadius = "8px";
    else style.borderRadius = props.shape.toString() + "px";
    if (props.width == null || props.width === "auto") style.width="auto";
    else style.width = props.width?.toString() + "px";
    if (props.height == null || props.height === "auto") style.height="auto";
    else style.height = props.height?.toString() + "px";
    return style;
}

/** Returns a button component */
export function Button(props:ButtonProps){
    return <button onClick={props.onClick} style={GenerateButtonStyle(props)} className="p-2 box-shadow-4-8-20 flex items-center justify-center text-center">
        <i className={props.icon+" text-[16px]"}></i>
        <span className="text-[16px] pl-2">{props.textContent}</span>
    </button>
}