import { getUserFromToken } from "@/utils/authTools";
import { COOKIE_NAME } from "@/utils/constants";
import prisma from "@/utils/db";
import { delay } from "@/utils/delay";
import { cookies } from "next/headers";
import ProjectCard from "./ProjectCard";

async function getAllProjectsForUser() {
  const userTokenfromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(userTokenfromCookie);
  const projects = await prisma.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects;
}

const Projects = async () => {
  const projects = await getAllProjectsForUser();
  console.log("PROJECTS", projects);

  return projects.map((project) => {
    return <ProjectCard key={project.id} project={project} />;
  });
};

export default Projects;
