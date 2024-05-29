import { cookies } from "next/headers";
import { getUserFromToken } from "./authTools";
import { COOKIE_NAME } from "./constants";

export const getUserFromDb = async () => {
  const userTokenfromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(userTokenfromCookie);
  return user;
};
