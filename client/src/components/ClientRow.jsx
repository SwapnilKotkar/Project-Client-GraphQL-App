import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {client.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {client.email}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {client.phone}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <button
          className="bg-red-500 px-4 py-1 rounded-sm shadow-md text-white"
          onClick={deleteClient}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
