"use client";
import { useState, useTransition } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useFormState } from "react-dom";
import { createPost } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(() => {
      createPost(name);
    });
    setShowModal(false);
    router.refresh();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => setShowModal(true)}>+ New Project</Button>

      {showModal && (
        <Modal>
          <div className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center z-50">
            <div className="ash-mesh w-3/4 bg-white rounded-xl p-8">
              <h1 className="text-3xl mb-6">New Project</h1>
              <form className="flex items-center justify-center gap-4">
                <Input
                  placeholder="project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[100%]"
                />
                <Button
                  type="submit"
                  isLoading={isPending}
                  onClick={handleClick}
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

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal> */}
    </div>
  );
};

export default NewProject;
