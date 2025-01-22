import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FaSearch className="text-white" />
        <h1 className="text-2xl font-bold">Busca CEP</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-200 shadow-md"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;
