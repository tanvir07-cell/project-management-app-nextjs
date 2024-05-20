"use client";

import Link from "next/link";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser, signInUser } from "@/actions/auth";

const registerContent = {
  linkUrl: "/sign-in",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "LogIn",
};

const initState = { message: null, code: null };

const AuthComponent = ({ mode }: { mode: "register" | "sign-in" }) => {
  const content = mode === "register" ? registerContent : signinContent;
  const [formState, action] = useFormState(
    mode === "register" ? registerUser : signInUser,
    initState
  );

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form className="py-10 w-full" action={action}>
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  name="firstName"
                  required
                  placeholder="First Name"
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  name="lastName"
                  required
                  placeholder="Last Name"
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              name="password"
              required
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
          {formState.message && (
            <div className="text-red-500 text-center mt-4">
              {formState.code === "P2002"
                ? "Email already exists"
                : "Error Occured! Please try again later."}
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};

export default AuthComponent;
