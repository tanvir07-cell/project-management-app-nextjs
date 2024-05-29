import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { cookies } from "next/headers";
import Card from "./Card";
import Button from "./Button";
import { delay } from "@/utils/delay";
import GlassPane from "./GlassPane";
import CreateTaskButton from "./CreateTaskButton";
import Input from "./Input";
import CompletedRadio from "./CompletedRadio";
import { TASK_STATUS } from "@prisma/client";
import { memoize } from "nextjs-better-unstable-cache";
import { getUserFromDb } from "@/utils/users";
let user;
const getAllDueTaskFromUser = memoize(
  async (id) => {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
          deleted: false,
        },
      },
      take: 5,
      orderBy: {
        due: "asc",
      },
    });
    return tasks;
  },
  {
    persist: true,
    revalidateTags: () => ["dashboard:tasks"],
    log: ["datacache", "verbose"],
    logid: "dashboard:tasks",
  }
);

const TaskCard = async ({ title, tasks, id }) => {
  const user = await getUserFromDb();
  tasks =
    tasks && tasks.filter((task) => task.status !== TASK_STATUS.COMPLETED);
  const data = tasks || (await getAllDueTaskFromUser(user.id));

  return (
    <Card className="mb-10 ash-mesh ">
      {!id && (
        <h1
          className="
       text-xl text-center text-gray-700/90 dark:text-white/90
       mb-5
      "
        >
          Due Tasks by user : {user.firstName}
        </h1>
      )}
      <div className="flex justify-between items-center gap-10">
        <div>
          <span className="text-3xl text-gray-600 dark:text-white/90">
            {title}
          </span>
        </div>

        {/* only show this button to the specific project page */}
        {id && <CreateTaskButton id={id} />}
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2 " key={task.id}>
                <div>
                  {id ? (
                    <CompletedRadio id={task.id} label={task.name} />
                  ) : (
                    <span className="text-gray-700/90 text-xl dark:text-white/80">
                      {task.name}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-700/70 text-sm dark:text-white/60">
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
