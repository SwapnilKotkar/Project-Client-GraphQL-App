import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [projectData, setProjectData] = useState({
    name: project.name,
    description: project.description,
    status: "",
  });

  const { name, description, status } = projectData;

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateProject(name, description, status);
  };

  return (
    <>
      <div className="px-6">
        <p className="text-xl font-bold pb-4">Update project details</p>
        <form action="" className="lg:w-1/2 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
              value={projectData.name}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="email">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
              placeholder="Description"
              type="description"
              id="description"
              name="description"
              onChange={handleChange}
              required
              value={projectData.description}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="status">
                Status
              </label>
              <select
                className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                placeholder="Status"
                type="status"
                id="status"
                name="status"
                onChange={handleChange}
                required
                value={projectData.status}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-sm bg-[#e535ab] px-4 py-2 text-white sm:w-auto"
            >
              <span className="font-medium text-sm px-3 py-1">
                Update Project
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
