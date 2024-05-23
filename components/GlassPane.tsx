import clsx from "clsx";
import { PropsWithChildren } from "react";

const GlassPane = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
