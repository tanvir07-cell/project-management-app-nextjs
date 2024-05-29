import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { delay } from "@/utils/delay";
import { cookies } from "next/headers";
import ProjectCard from "./ProjectCard";
import { getUserFromDb } from "@/utils/users";
import { memoize } from "nextjs-better-unstable-cache";

const getAllProjectsForUser = memoize(
  async (id) => {
    await delay(1000);

    const projects = await prisma.project.findMany({
      where: {
        ownerId: id,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  },
  {
    persist: true,
    revalidateTags: () => ["dashboard:projects"],
    suppressWarnings: true,
    log: ["datacache", "verbose"],
    logid: "dashboard:projects",
  }
);

const Projects = async () => {
  const user = await getUserFromDb();

  const projects = await getAllProjectsForUser(user.id);

  return projects.map((project) => {
    return <ProjectCard key={project.id} project={project} />;
  });
};

export default Projects;
