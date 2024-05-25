"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DarkMode = () => {
  // Initialize theme from localStorage
  const [toggle, setToggle] = useState(() => {
    const storedTheme = window.localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (toggle) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [toggle]);

  return (
    <>
      {showModal && (
        <Modal>
          <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center z-50">
            <div className="dark">
              <div className="p-12 border m-6 rounded rainbow-mesh dark:text-blue-50">
                <label htmlFor="theme-toggle">
                  <input
                    id="theme-toggle"
                    type="checkbox"
                    checked={toggle}
                    onChange={(e) => {
                      setToggle(e.target.checked);
                    }}
                  />
                  {toggle ? "Dark" : "Light"}
                </label>
              </div>
            </div>
            <Button
              intent="danger"
              onClick={() => {
                setShowModal(false);
                router.push("/home");
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DarkMode;
