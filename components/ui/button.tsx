import * as React from "react";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "default";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] border text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855f38]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default:
    "border-[#6f4f2e] bg-[#855f38] text-amber-50 hover:bg-[#6f4f2e]",
  outline:
    "border-[#4c4c4c] bg-transparent text-[#1e150c] hover:bg-[#1e150c] hover:text-white",
  ghost: "border-transparent bg-transparent text-[#1e150c] hover:bg-[#f1ece9]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[25px] rounded-md px-2 text-xs",
  default: "h-[39px] px-3",
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
