"use server";
import { memoize } from "nextjs-better-unstable-cache";
import { getUserFromDb } from "./users";
import prisma from "./db";

const getAllDueTaskFromUser = memoize(
  async (id) => {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: id,
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

export const fetchTasksData = async () => {
  const user = await getUserFromDb();
  const tasks = await getAllDueTaskFromUser(user.id);

  const isCompleted = [];
  tasks.forEach((task) => {
    if (task.status === "COMPLETED") {
      isCompleted.push(1);
    } else {
      isCompleted.push(0);
    }
  });

  return isCompleted;
};
