import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout realizado com sucesso.');
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Busca CEP</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
