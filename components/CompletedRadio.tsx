"use client";
import React, { useState, useTransition } from "react";
import Input from "./Input";
import { updateTask } from "@/utils/api";

const CompletedRadio = ({ id }) => {
  const [completed, setCompleted] = useState(null);
  const [isPending, startTransition] = useTransition();

  return (
    <Input
      id={id}
      type="radio"
      checked={completed === id}
      onChange={() => {
        startTransition(() => {
          updateTask(id);
          setCompleted(id);
        });
      }}
      className="ml-2"
      name="completed"
    />
  );
};

export default CompletedRadio;
