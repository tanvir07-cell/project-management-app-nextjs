import TaskCard from "@/components/TaskCard";
import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { delay } from "@/utils/delay";
import { cookies } from "next/headers";

const getTaskByProjectId = async (id) => {
  await delay(1000);
  const getTokenFromCookies = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(getTokenFromCookies);
  const task = await prisma.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return task;
};

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const data = await getTaskByProjectId(params.id);
  return (
    <div>
      <TaskCard title={data?.name} tasks={data?.tasks} />
    </div>
  );
};

export default ProjectPage;
