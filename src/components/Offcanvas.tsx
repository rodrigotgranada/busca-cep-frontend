import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { fetchWithAuth } from "../api/fetchWithAuth";
import TextInput from "./Form/TextInput";
import { OffcanvasProps } from "../types";

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, onClose, onSave }) => {
  const initialFormData = {
    nome: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [adjustedCepMessage, setAdjustedCepMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cep") {
      setErrorMessage("");
      setAdjustedCepMessage("");
    }
  };

  const fetchCepData = async (cep: string) => {
    const sanitizedCep = cep.replace("-", "").trim();

    if (!sanitizedCep) {
      setErrorMessage("O campo CEP está vazio.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setAdjustedCepMessage("");

    try {
      const response = await fetchWithAuth(
        `http://localhost:3000/cep/${sanitizedCep}`
      );

      console.log(response);

      if (response.status === 4) {
        throw new Error("CEP inválido ou não encontrado.");
      } else if (response.status === 3) {
        setErrorMessage(response.message || "CEP não encontrado.");
        setFormData((prev) => ({
          ...prev,
          rua: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
        return;
      }

      const {
        data: { cep: locatedCep, street, neighborhood, city, state },
        status,
        message,
      } = response;

      setAdjustedCepMessage(status === 2 ? message : "");
      setFormData((prev) => ({
        ...prev,
        cep: status === 2 ? locatedCep : cep,
        rua: street,
        bairro: neighborhood,
        cidade: city,
        estado: state,
      }));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao buscar o CEP."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepBlur = () => {
    if (formData.cep) fetchCepData(formData.cep);
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClear();
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setAdjustedCepMessage("");
    setErrorMessage("");
  };

  const isFormDisabled = isLoading || !!errorMessage;

  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full transform transition-transform flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Novo Cadastro</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          <IoClose size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {adjustedCepMessage && (
          <div className="p-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded mb-4">
            <p>{adjustedCepMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-800 rounded mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="space-y-4">
          <TextInput
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
            disabled={isLoading}
          />
          <TextInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            disabled={isLoading}
          />
          <TextInput
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            placeholder="CEP"
            maskType="cep"
            isLoading={isLoading}
            onButtonClick={() => {
              if (formData.cep.trim()) {
                fetchCepData(formData.cep);
              } else {
                setErrorMessage("O campo CEP está vazio.");
              }
            }}
          />

          <TextInput
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            placeholder="Rua"
            disabled={isLoading}
            isLoading={isLoading}
          />
          <TextInput
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            placeholder="Bairro"
            disabled={isLoading}
            isLoading={isLoading}
          />
          <TextInput
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder="Cidade"
            disabled={isLoading}
            isLoading={isLoading}
          />
          <TextInput
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            placeholder="Estado"
            disabled={isLoading}
            isLoading={isLoading}
          />
          <TextInput
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Número"
            isLoading={isLoading}
          />
          <TextInput
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            placeholder="Complemento"
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="p-4 border-t flex justify-between">
        <button
          onClick={handleClear}
          className={`py-2 px-4 rounded-md ${
            isFormDisabled
              ? "bg-gray-300 text-gray-500"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          disabled={isFormDisabled}
        >
          Limpar
        </button>
        <button
          onClick={handleSubmit}
          className={`py-2 px-4 rounded-md ${
            isFormDisabled
              ? "bg-gray-300 text-gray-500"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          disabled={isFormDisabled}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Offcanvas;
