import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;

  if (error) return <p>Error: Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <div className="px-6 space-y-4">
          <div>
            <Link
              className="inline-block rounded bg-[#e535ab] px-12 py-3 text-sm font-medium text-white"
              to={"/"}
            >
              Go back
            </Link>
          </div>
          <div className="md:w-2/3 flex flex-col border border-gray-200 rounded-md shadow-md space-y-4">
            <div className="flex-1 py-4 px-6">
              <div className="space-y-4">
                <p className="text-xl font-semibold text-gray-500">Project: <span className="font-bold text-gray-700">{data.project.name}</span></p>
                <p className="text-xl font-semibold text-gray-500">Description: <span className="text-base font-normal text-gray-700">{data.project.description}</span></p>
                <p className="text-xl font-semibold text-gray-500">Status: <span className="text-base font-normal text-gray-700">{data.project.status}</span></p>

              </div>
            </div>
            <div className="flex-1 py-4 px-6">
              <ClientInfo client={data.project.client}/>
            </div>
            <EditProjectForm project={data.project}/>
            <DeleteProjectButton projectID={data.project.id}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
