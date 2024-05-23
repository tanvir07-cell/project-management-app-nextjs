import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/utils/delay";
import { COOKIE_NAME } from "@/utils/constants";
import { getUserFromToken } from "@/utils/authTools";
import Image from "next/image";

import USER from "@/images/user1.png";
import GlassPane from "./GlassPane";
import { signOutUser } from "@/actions/auth";
import SignOut from "./SignOut";

const getUserData = async () => {
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
        <GlassPane
          className="rounded-full
            border-4
            border-white
            shadow-lg
            bg-white
             candy-mesh
             p-4
              w-40
              h-40
              flex
              items-center
              justify-center
              align-center
              container
              mx-auto
              relative
              z-10
              
              
                
            "
        >
          <Image
            src={USER}
            alt="user"
            height={200}
            width={200}
            className="
            
            
          
          "
          />
        </GlassPane>

        <div className="flex items-center justify-center gap-10">
          <h1 className="text-3xl text-gray-700/90 font-bold mb-4  mt-7">
            Hello, {user?.firstName}!
          </h1>
          <SignOut />
        </div>

        <h4 className="text-xl text-white/95 mt-7 mb-7 text-center">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div className="flex items-center justify-center">
        <Button size="large">Today's Schedule</Button>
      </div>
    </Card>
  );
};

export default Greetings;
