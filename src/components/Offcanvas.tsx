import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "./Form/TextInput";
import { FormData, OffcanvasProps } from "../types";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { FaSpinner } from "react-icons/fa";
import { schema } from "../utils/validate";
import { toast } from "react-toastify";

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const cep = watch("cep");

  const fetchCepData = async (cep: string) => {
    const sanitizedCep = cep.replace("-", "").trim();

    if (!sanitizedCep) {
      setValue("rua", "");
      setValue("bairro", "");
      setValue("cidade", "");
      setValue("estado", "");
      toast.error("O campo CEP está vazio.");
      return;
    }

    setIsLoading(true);
    setFeedbackMessage("Buscando dados do CEP...");

    try {
      const response = await fetchWithAuth(
        `http://localhost:3000/cep/${sanitizedCep}`
      );

      if (response.status === 4) {
        throw new Error("CEP inválido ou não encontrado.");
      } else if (response.status === 3) {
        setValue("rua", "");
        setValue("bairro", "");
        setValue("cidade", "");
        setValue("estado", "");
        setFeedbackMessage("CEP não encontrado.");
        return;
      }

      const {
        data: { street, neighborhood, city, state },
      } = response;

      setValue("rua", street || "");
      setValue("bairro", neighborhood || "");
      setValue("cidade", city || "");
      setValue("estado", state || "");
      toast.success("Dados do CEP carregados com sucesso!");
      setFeedbackMessage("");
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      toast.error("Erro ao buscar o CEP.");
      setFeedbackMessage("Erro ao buscar o CEP.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    onSave(data);
    reset();
    toast.success("Cadastro realizado com sucesso!");
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full transform transition-transform flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <FaSpinner className="text-white animate-spin" size={40} />
        </div>
      )}

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 relative">
        {feedbackMessage && (
          <div className="mb-4 text-blue-600 font-semibold">
            {feedbackMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Nome"
                error={errors.nome?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="E-mail"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="CEP"
                error={errors.cep?.message}
                maskType="cep"
                isLoading={isLoading}
                onBlur={() => fetchCepData(cep)}
                onButtonClick={() => fetchCepData(cep)}
              />
            )}
          />
          <Controller
            name="rua"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Rua"
                disabled
                value={field.value || ""}
                isLoading={isLoading}
              />
            )}
          />
          <Controller
            name="bairro"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Bairro"
                disabled
                value={field.value || ""}
                isLoading={isLoading}
              />
            )}
          />
          <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Cidade"
                disabled
                value={field.value || ""}
                isLoading={isLoading}
              />
            )}
          />
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Estado"
                disabled
                value={field.value || ""}
                isLoading={isLoading}
              />
            )}
          />
          <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Número"
                error={errors.numero?.message}
              />
            )}
          />
          <Controller
            name="complemento"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Complemento"
                value={field.value || ""}
              />
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => reset()}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Limpar
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-md ${
                isValid
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!isValid}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Offcanvas;
