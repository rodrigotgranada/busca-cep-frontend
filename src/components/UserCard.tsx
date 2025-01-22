import React from "react";
import { motion } from "framer-motion";
import { UserCardProps } from "../types";
import { AiOutlineDelete } from "react-icons/ai";

const UserCard: React.FC<UserCardProps> = ({
  nome,
  email,
  endereco,
  onDelete,
}) => {
  return (
    <motion.div
      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
    >
      <div>
        <h3 className="text-lg font-bold mb-2">{nome}</h3>
        <p className="text-gray-700 mb-1">{email}</p>
        <p className="text-gray-500 text-sm">{endereco}</p>
      </div>
      <button
        onClick={onDelete}
        aria-label="Excluir usuário"
        className="flex items-center justify-center mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        <AiOutlineDelete className="mr-2" size={18} />
      </button>
    </motion.div>
  );
};

export default UserCard;
