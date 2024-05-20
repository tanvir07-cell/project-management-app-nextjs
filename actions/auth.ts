"use server";

import { signIn, signUp } from "@/utils/authTools";
import { cookies } from "next/headers";
import { z } from "zod";
import { COOKIE_NAME } from "@/utils/constants";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerUser = async (prevState: any, formData: FormData) => {
  const data = registerSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  try {
    const { user, token } = await signUp(data);
    cookies().set(COOKIE_NAME, token);
  } catch (err: any) {
    console.error(err);
    return { message: err.message, code: err.code };
  }
  redirect("/sign-in");
};

export const signInUser = async (prevState: any, formData: FormData) => {
  const data = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  try {
    const { user, token } = await signIn(data);
    cookies().set(COOKIE_NAME, token);
  } catch (err: any) {
    console.error(err);
    return { message: err.message, code: err.code };
  }

  redirect("/register");
};
