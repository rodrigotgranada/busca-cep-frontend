import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (cep: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [cep, setCep] = useState('');

  const handleSearch = () => {
    if (cep.trim().length === 8) {
      onSearch(cep);
    } else {
      alert('Por favor, insira um CEP válido com 8 dígitos.');
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <input
        type="text"
        placeholder="Digite o CEP..."
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        className="border rounded-md p-2 w-1/2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 rounded-md shadow hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
