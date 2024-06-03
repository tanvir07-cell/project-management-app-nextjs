import dynamic from "next/dynamic";

const TaskChart = dynamic(() => import("@/components/TaskChart"), {
  ssr: false,
});

const page = () => {
  return (
    <div>
      <TaskChart />
    </div>
  );
};

export default page;
