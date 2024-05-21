import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/utils/delay";
import { COOKIE_NAME } from "@/utils/constants";
import { getUserFromToken } from "@/utils/authTools";

const getUserData = async () => {
  await delay(2000);
  const getTokenFromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };

  const user = await getUserFromToken(getTokenFromCookie);

  return user;
};

const Greetings = async () => {
  const user = await getUserData();

  return (
    <Card className="w-full sm:py-4 relative px-5 py-10">
      <div className="mb-4">
        <h1 className="text-3xl text-white/95 font-bold mb-4 text-center">
          Hello, {user.firstName}!
        </h1>
        <h4 className="text-xl text-white text-center">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large" className="w-full">
          Today's Schedule
        </Button>
      </div>
    </Card>
  );
};

export default Greetings;
