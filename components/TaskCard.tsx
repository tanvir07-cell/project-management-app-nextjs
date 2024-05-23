import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { cookies } from "next/headers";
import Card from "./Card";
import Button from "./Button";
import { delay } from "@/utils/delay";
import GlassPane from "./GlassPane";

const getAllDueTaskFromUser = async () => {
  await delay(2000);
  const getTokenFromCookies = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(getTokenFromCookies);
  const tasks = await prisma.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: "COMPLETED",
        deleted: true,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
  return tasks;
};

const TaskCard = async ({ title, tasks }) => {
  const data = tasks || (await getAllDueTaskFromUser());
  console.log(data);

  return (
    <Card className="mb-10 ash-mesh">
      <div className="flex justify-between items-center gap-10">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2 " key={task.id}>
                <div>
                  <span className="text-gray-700/90 text-xl">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-700/70 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
