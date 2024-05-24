"use client";

import { useState, useTransition } from "react";
import Button from "./Button";
import { createTask } from "@/utils/api";
import Modal from "./Modal";
import Input from "./Input";
import { useRouter } from "next/navigation";

const CreateTaskButton = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  function handleClick() {
    startTransition(() => {
      createTask(name, id);
    });
    setShowModal(false);
    router.refresh();
  }

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          intent="text"
          className="text-violet-600"
        >
          + Create New
        </Button>
      </div>
      {showModal && (
        <Modal>
          <div className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center z-50">
            <div className="ash-mesh w-3/4 bg-white rounded-xl p-8">
              <h1 className="text-3xl mb-6">New Task</h1>
              <form className="flex items-center justify-center gap-4">
                <Input
                  placeholder="task name"
                  value={name}
                  className="w-[100%]"
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  type="submit"
                  onClick={handleClick}
                  isLoading={isPending}
                >
                  Create
                </Button>
                <Button
                  type="submit"
                  intent="danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateTaskButton;
