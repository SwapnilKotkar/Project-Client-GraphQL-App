import React from "react";
import { FaIdBadge, FaEnvelope, FaPhone } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <>
      <div className="space-y-3">
        <div>
          <p className="text-xl font-bold">Client Info</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <FaIdBadge className="text-gray-700" />
            <p className="text-gray-700">{client.name}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaEnvelope className="text-gray-700" />
            <p className="text-gray-700">{client.email}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaPhone className="text-gray-700" />
            <p className="text-gray-700">{client.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientInfo;
