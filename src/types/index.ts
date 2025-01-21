export interface CepData {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export interface CepResult {
  data: CepData;
  status: number;
  message: string;
}

export interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: {
    nome: string;
    email: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    complemento: string;
  }) => void;
}

export type MaskType = "cep" | "cpf" | "phone" | "default";

export interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: () => void;
  error?: string;
  maskType?: MaskType;
  isLoading?: boolean;
  onButtonClick?: () => void;
}

export interface User {
  nome: string;
  email: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

export interface UserCardProps {
  nome: string;
  email: string;
  endereco: string;
  complemento: string;
}
