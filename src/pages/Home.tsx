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
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuários</h1>

      <button
        onClick={() => setIsOffcanvasOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        + Novo Cadastro
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Usuários Cadastrados:</h2>
        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
