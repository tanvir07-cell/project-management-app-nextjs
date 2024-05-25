import clsx from "clsx";
import { PropsWithChildren } from "react";

const Input = ({
  className,
  ...props
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full dark:bg-gray-800 dark:text-white/80 focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out",
        className
      )}
      {...props}
    />
  );
};

export default Input;
