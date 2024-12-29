import ProjectInfoViewView from "./ProjectInfoViewView";

export function ProjectInfoViewContainer({ project, members, tasks }) {
  // ...any additional logic...
  return (
    <ProjectInfoViewView
      project={project}
      members={members}
      tasks={tasks}
    />
  );
}
