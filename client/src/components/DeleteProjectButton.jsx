import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";

const DeleteProjectButton = ({ projectID }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectID },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <>
      <div className="p-6 flex justify-end">
        <button
          className="bg-red-500 text-white text-sm font-semibold py-3 px-5 rounded-sm shadow-md"
          onClick={deleteProject}
        >
          Delete Project
        </button>
      </div>
    </>
  );
};

export default DeleteProjectButton;
