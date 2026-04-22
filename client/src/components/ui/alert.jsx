import * as React from "react";

export function Alert({ className = "", children, ...props }) {
  return (
    <div
      role="alert"
      className={[
        "relative w-full rounded-lg border p-4 text-sm",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ className = "", children, ...props }) {
  return (
    <div
      className={["text-sm [&_p]:leading-relaxed", className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
