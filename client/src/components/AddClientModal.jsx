import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
  const [open, setOpen] = useState(false);

  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const { name, email, phone } = clientData;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, phone, email },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    addClient(name, email, phone);

    setOpen(false);

    clear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setClientData({ ...clientData, [name]: value });
  };

  const clear = () => {
    setClientData({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="px-6">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#e535ab] mb-4 px-6 py-3 rounded-md shadow-md text-white font-semibold text-sm"
      >
        Add Client
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
                  value={clientData.name}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={clientData.email}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    required
                    value={clientData.phone}
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#e535ab] px-4 py-2 text-white sm:w-auto"
                >
                  <span className="font-medium text-sm px-3 py-1">
                    {" "}
                    Add Client{" "}
                  </span>
                </button>
                <div
                  onClick={clear}
                  className="inline-flex w-full items-center justify-center rounded-lg text-[#e535ab] border border-[#e535ab] px-4 py-2 sm:w-auto cursor-pointer"
                >
                  <span className="font-medium text-sm px-3 py-1"> Clear </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClientModal;
