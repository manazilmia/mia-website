import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Badge({ active = false, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm leading-[22px] ${
        active
          ? "border-[#855f38] bg-[#f1ece9] font-medium text-[#855f38]"
          : "border-[#e7e7e7] bg-white text-[#4C4238]"
      } ${className}`}
      {...props}
    />
  );
}
