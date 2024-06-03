import Greetings from "@/components/Greetings";
import NewProject from "@/components/NewProject";
import Projects from "@/components/Projects";
import TaskCard from "@/components/TaskCard";
import GreetingsSkeleton from "@/components/loading";

import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1 mt-4">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Projects />
          </Suspense>

          {/** projects map here */}
          <div className="w-[50%] mx-auto p-2">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <Suspense fallback={<GreetingsSkeleton />}>
              <TaskCard />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
