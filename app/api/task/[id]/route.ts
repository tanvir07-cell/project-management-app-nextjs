import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { TASK_STATUS } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const getTokenFromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(getTokenFromCookie);
  const { id, completed } = await req.json();

  const updatedTask = await prisma.task.update({
    where: {
      ownerId_id: {
        ownerId: user.id,
        id,
      },
    },

    data: {
      status: TASK_STATUS.COMPLETED,
    },
  });

  revalidatePath(`/project/${id}`);
  revalidatePath(`/home`);
  revalidateTag(`/project/${id}`);

  return NextResponse.json({
    message: "Task updated successfully",
    task: updatedTask,
  });
};
