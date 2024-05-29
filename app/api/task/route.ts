import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const getTokenFromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(getTokenFromCookie);
  const { name, projectId } = await request.json();
  const createdTask = await prisma.task.create({
    data: {
      name,
      projectId,
      ownerId: user?.id,
    },
  });
  revalidatePath(`/project/${projectId}`);
  revalidatePath(`/home`);
  revalidateTag("tasks");
  revalidateTag("dashboard:tasks");

  return NextResponse.json({
    message: "Task created successfully",
    task: createdTask,
  });
};
