import React, { useEffect, useState } from "react";
import Offcanvas from "../components/Offcanvas";
import UserCard from "../components/UserCard";
import { User } from "../types";
import Header from "../components/Header";

const UserRegistrationPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsOffcanvasOpen(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cadastro de Usuários</h1>
          <button
            onClick={() => setIsOffcanvasOpen(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            <span className="mr-2">+ Novo Cadastro</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Usuários Cadastrados:</h2>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((user, index) => (
                <UserCard
                  key={index}
                  nome={user.nome}
                  email={user.email}
                  endereco={`${user.rua}, ${user.numero} - ${user.cidade}/${user.estado}`}
                  complemento={user.complemento}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum usuário cadastrado ainda.</p>
          )}
        </div>
      </div>

      {/* Offcanvas */}
      <Offcanvas
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
        onSave={addUser}
      />
    </>
  );
};

export default UserRegistrationPage;
