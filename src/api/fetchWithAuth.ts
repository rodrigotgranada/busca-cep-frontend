export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }
  return response.json();
};
