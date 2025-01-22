import React, { useState } from "react";
import { toast } from "react-toastify";
import TextInput from "../components/Form/TextInput";
import { login as apiLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await apiLogin(username, password);
      login(data.token);
      toast.success("Login bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(error instanceof Error && "Erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  const inativeFunction = () => {
    toast.warning("Função não habilitada!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Por favor, insira suas credenciais para continuar.
        </p>
        <TextInput
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
          isLoading={isLoading}
          error=""
        />
        <div className="mt-4">
          <TextInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            isLoading={isLoading}
            error=""
          />
        </div>
        <button
          onClick={handleLogin}
          className={`w-full p-3 mt-6 rounded-md text-lg font-medium shadow-sm transition-all ${
            isLoading
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <p className="text-center text-gray-500 mt-6 text-sm">
          Esqueceu sua senha?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline hover:text-blue-600"
            onClick={inativeFunction}
          >
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
