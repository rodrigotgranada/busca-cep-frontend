import { toast } from "react-toastify";

export const login = async (username: string, password: string) => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas.");
  }

  const data = await response.json();
  return data;
};

export const logout = (navigate: (path: string) => void) => {
  localStorage.removeItem("token");
  toast.success("Logout realizado com sucesso.");
  navigate("/login");
};
