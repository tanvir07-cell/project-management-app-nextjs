const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createPost = async (name: string) => {
  const res = await fetch(new URL("/api/home", createURL("/api/home")), {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  const { message, project } = await res.json();

  return { message, project };
};

export const createTask = async (name: string, projectId: string) => {
  const res = await fetch(new URL("/api/task", createURL("/api/task")), {
    method: "POST",
    body: JSON.stringify({ name, projectId }),
  });

  const { message, task } = await res.json();

  return { message, task };
};
