import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    clientID: "",
    status: "new",
  });

  const { name, description, clientID, status } = projectData;

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientID, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    addProject(name, description, clientID, status);

    setOpen(false);

    clear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectData({ ...projectData, [name]: value });
  };

  const clear = () => {
    setProjectData({
      name: "",
      description: "",
      clientID: "",
      status: "new",
    });
  };

  if (loading) return null;

  if (error) return <p>Error: Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <div className="px-6">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="bg-[#e535ab] mb-4 px-6 py-3 rounded-md shadow-md text-white font-semibold text-sm"
          >
            Add Project
          </button>
          {open && (
            <div className="w-full">
              <div className="md:w-1/2 lg:w-1/3 rounded-lg bg-white p-3 border border-gray-200 shadow-lg lg:col-span-3 lg:p-7 mb-4">
                <form action="" className="space-y-4" onSubmit={handleSubmit}>
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

                    <div>
                      <label className="sr-only" htmlFor="clientid">
                        ClientID
                      </label>
                      <select
                        name="clientID"
                        id="clientID"
                        className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                        onChange={handleChange}
                        value={projectData.clientID}
                      >
                        <option value="">--Select Client--</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-[#e535ab] px-4 py-2 text-white sm:w-auto"
                    >
                      <span className="font-medium text-sm px-3 py-1">
                        Add Project
                      </span>
                    </button>
                    <div
                      onClick={clear}
                      className="inline-flex w-full items-center justify-center rounded-lg text-[#e535ab] border border-[#e535ab] px-4 py-2 sm:w-auto cursor-pointer"
                    >
                      <span className="font-medium text-sm px-3 py-1">
                        Clear
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
