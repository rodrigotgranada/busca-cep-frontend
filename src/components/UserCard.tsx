import React from 'react';
import { UserCardProps } from '../types';


const UserCard: React.FC<UserCardProps> = ({ nome, email, endereco }) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white">
      <h3 className="text-lg font-bold">{nome}</h3>
      <p className="text-gray-700">{email}</p>
      <p className="text-gray-500 text-sm">{endereco}</p>
    </div>
  );
};

export default UserCard;
