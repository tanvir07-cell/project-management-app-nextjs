"use server";

import jwt from "jsonwebtoken";
import prisma from "./db";

import bcrypt from "bcrypt";

const SECRET = "use_an_ENV_VAR";

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET);
  return token;
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string };
  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });

  return user;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!match) {
    throw new Error("No user found");
  }
  // check password is matched or not using bcrypt:
  const checkPassword = await comparePassword(password, match.password);

  if (!checkPassword) {
    throw new Error("invalid user credentials");
  }

  // if password is matched, then create a token for the user:
  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;
  return { user, token };
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const hashedPassword = await hashPW(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
  const token = createTokenForUser(user.id);
  return { user, token };
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

console.log(createTokenForUser("123"));
