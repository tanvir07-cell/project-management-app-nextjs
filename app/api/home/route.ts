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

  const { name } = await request.json();

  const createdProject = await prisma.project.create({
    data: {
      name,
      ownerId: user?.id,
    },
  });

  revalidatePath("/home");
  revalidateTag("projects");
  revalidateTag("dashboard:projects");

  return NextResponse.json({
    message: "Project created successfully",
    project: createdProject,
  });
};
