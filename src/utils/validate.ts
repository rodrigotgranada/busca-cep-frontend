import * as Yup from "yup";

export const schema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  cep: Yup.string()
    .matches(/^[0-9]{5}-?[0-9]{3}$/, "CEP deve ser no formato 12345-678")
    .required("CEP é obrigatório"),
  rua: Yup.string().default(""),
  bairro: Yup.string().default(""),
  cidade: Yup.string().default(""),
  estado: Yup.string().default(""),
  numero: Yup.string().required("Número é obrigatório"),
  complemento: Yup.string().default(""),
});
