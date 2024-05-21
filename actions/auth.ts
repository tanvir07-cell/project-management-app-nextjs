"use server";
import { cookies } from "next/headers";
import { signUp, signIn } from "@/utils/authTools";
import { z } from "zod";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/utils/constants";
import { revalidatePath } from "next/cache";

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
    const { token } = await signUp(data);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Failed to sign you up" };
  }

  redirect("home");
};

export const signInUser = async (prevState: any, formData: FormData) => {
  const data = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    const { token } = await signIn(data);
    cookies().set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    return { message: "Failed to sign you in" };
  }
  redirect("home");
};
