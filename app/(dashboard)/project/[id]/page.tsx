import { delay } from "@/utils/delay";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  await delay(2000);
  return <div>ProjectPage : {params.id}</div>;
};

export default ProjectPage;
