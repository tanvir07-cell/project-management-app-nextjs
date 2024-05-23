import React from "react";
import GlassPane from "./GlassPane";
import Link from "next/link";
import clsx from "clsx";

type Project = {
  id: string;
  name: string;
  due: string;
  createdAt: string;
  tasks: any[];
};

const ProjectCard = ({ project }: { project: Project }) => {
  const completedCount = project.tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;
  const progress =
    Math.ceil((completedCount / project.tasks.length) * 100) || 0;
  return (
    <div key={project.id} className="w-1/3 p-3 mb-5">
      <GlassPane className="ash-mesh  hover:scale-105 transition-all ease-in-out duration-200">
        <Link href={`/project/${project.id}`}>
          <div className=" p-4 rounded-lg ">
            <h1 className="text-xl font-bold">{project.name}</h1>
            <p className="text-sm text-gray-700 mt-2 mb-5">
              Created:{" "}
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
              <div
                className={clsx(
                  "h-full text-center text-xs text-white  candy-mesh rounded-full"
                )}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="text-right">
              <span className="text-sm text-gray-600 font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </Link>
      </GlassPane>
    </div>
  );
};

export default ProjectCard;
