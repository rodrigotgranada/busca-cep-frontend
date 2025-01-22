import React from "react";
import { UserCardProps } from "../types";

const UserCard: React.FC<UserCardProps> = ({ nome, email, endereco }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold mb-2">{nome}</h3>
      <p className="text-gray-700 mb-1">{email}</p>
      <p className="text-gray-500 text-sm">{endereco}</p>
    </div>
  );
};

export default UserCard;
