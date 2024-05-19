import clsx from "clsx";
import { PropsWithChildren } from "react";

const Card = ({
  className,
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl ash-mesh border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
