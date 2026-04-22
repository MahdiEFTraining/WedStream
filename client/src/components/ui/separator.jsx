import * as React from "react";

export function Separator({ className = "", orientation = "horizontal", ...props }) {
  return (
    <div
      role="none"
      className={[
        "shrink-0 bg-border",
        orientation === "vertical" ? "w-px h-full" : "h-px w-full",
        className,
      ].join(" ")}
      {...props}
    />
  );
}