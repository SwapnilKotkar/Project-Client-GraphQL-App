import React from "react";
import { useQuery } from "@apollo/client";

import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading)
    return (
     <div className="w-full flex justify-center">
         <div className='lds-roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
     </div>
    );

  if (error) return <p>Error: Something went wrong...</p>;

  return (
    <>
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-1/3 divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Clients;
