import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Offcanvas from "../components/Offcanvas";
import UserCard from "../components/UserCard";
import ConfirmationModal from "../components/ConfirmationModal";
import { useUsers } from "../context/UsersContext";
import Header from "../components/Header";
import { toast } from "react-toastify";

const USERS_PER_PAGE = 4;

const UserRegistrationPage: React.FC = () => {
  const { users, addUser, deleteUser } = useUsers();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteClick = (index: number) => {
    setUserToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete !== null) {
      const deletedUser = users[userToDelete];
      deleteUser(userToDelete);
      setUserToDelete(null);
      setIsModalOpen(false);
      toast.success(`Usuário ${deletedUser.nome} foi excluído com sucesso!`);
    }
  };

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

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
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {paginatedUsers.map((user, index) => (
                    <UserCard
                      key={startIndex + index}
                      nome={user.nome}
                      email={user.email}
                      endereco={`${user.rua}, ${user.numero} - ${
                        user.complemento ? `${user.complemento} - ` : ""
                      } ${user.cidade}/${user.estado}`}
                      complemento={user.complemento}
                      onDelete={() => handleDeleteClick(startIndex + index)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Paginação */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Anterior
                </button>
                <span className="text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Próximo
                </button>
              </div>
            </>
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

      {/* Modal de confirmação */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteUser}
        message="Tem certeza que deseja excluir este usuário?"
      />
    </>
  );
};

export default UserRegistrationPage;
