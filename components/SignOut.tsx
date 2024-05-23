"use client";

import { signOutUser } from "@/actions/auth";
import Button from "./Button";

const SignOut = () => {
  return (
    <Button intent="secondary" onClick={() => signOutUser()}>
      SignOut
    </Button>
  );
};

export default SignOut;
