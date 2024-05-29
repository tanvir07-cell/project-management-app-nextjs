"use client";
import React, { useEffect, useState, useTransition } from "react";
import Input from "./Input";
import { updateTask } from "@/utils/api";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const CompletedRadio = ({ id, label }) => {
  const [completed, setCompleted] = useState(null);
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <label
        htmlFor={id}
        className={clsx(
          "text-gray-700/90 text-xl dark:text-white/80 mt-10 mb-10 mx-10",
          {
            "line-through": completed === id,
          }
        )}
      >
        {label}
      </label>
      <Input
        id={id}
        type="radio"
        checked={completed === id}
        onChange={() => {
          updateTask(id);
          setCompleted(id);
          router.refresh();
        }}
        className="ml-2"
        name="completed"
      />
    </div>
  );
};

export default CompletedRadio;
