import React from "react";
import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;

  if (error) return <p>Error: Something went wrong...</p>;

  return (
    <div className="mx-6">
      <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
      {data.projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p> No projects yet</p>
      )}
    </div>
  );
};

export default Projects;
