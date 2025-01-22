import React from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FaSearch className="text-white" />
        <h1 className="text-2xl font-bold">Busca CEP</h1>
      </div>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-200 shadow-md"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      )}
    </header>
  );
};

export default Header;
