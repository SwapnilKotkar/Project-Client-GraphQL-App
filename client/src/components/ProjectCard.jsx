import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <>
      <article className="h-32 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 space-x-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Status: <strong>{project.status}</strong>
            </p>

            <p className="text-xl font-medium text-gray-900">{project.name}</p>
          </div>
        </div>

        <a
          className="rounded bg-green-100 px-3 py-2 text-green-600 cursor-pointer"
          href={`project/${project.id}`}
        >
          View
        </a>
      </article>
    </>
  );
};

export default ProjectCard;
