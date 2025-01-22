import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Offcanvas from "../components/Offcanvas";
import * as api from "../api/fetchWithAuth";

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

jest.mock("../api/fetchWithAuth", () => ({
  fetchWithAuth: jest.fn(),
}));

describe("Offcanvas Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form inputs", () => {
    render(
      <Offcanvas isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/CEP/i)).toBeInTheDocument();
  });

  it("calls onSave when the form is submitted", async () => {
    (api.fetchWithAuth as jest.Mock).mockResolvedValue({
      data: {
        cep: "12345-678",
        street: "Rua Exemplo",
        neighborhood: "Bairro Teste",
        city: "Cidade Teste",
        state: "Estado Teste",
      },
      status: 2,
      message: "CEP carregado com sucesso!",
    });

    render(
      <Offcanvas isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    fireEvent.change(screen.getByPlaceholderText(/Nome/i), {
      target: { value: "Teste Nome" },
    });
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
      target: { value: "teste@teste.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/CEP/i), {
      target: { value: "12345-678" },
    });
    fireEvent.blur(screen.getByPlaceholderText(/CEP/i));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Rua/i)).toHaveValue("Rua Exemplo");
      expect(screen.getByPlaceholderText(/Bairro/i)).toHaveValue(
        "Bairro Teste"
      );
      expect(screen.getByPlaceholderText(/Cidade/i)).toHaveValue(
        "Cidade Teste"
      );
      expect(screen.getByPlaceholderText(/Estado/i)).toHaveValue(
        "Estado Teste"
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/Número/i), {
      target: { value: "123" },
    });

    await waitFor(() => {
      const saveButton = screen.getByRole("button", { name: /Salvar/i });
      expect(saveButton).not.toBeDisabled();
    });

    const saveButton = screen.getByRole("button", { name: /Salvar/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        nome: "Teste Nome",
        email: "teste@teste.com",
        cep: "12345-678",
        rua: "Rua Exemplo",
        bairro: "Bairro Teste",
        cidade: "Cidade Teste",
        estado: "Estado Teste",
        numero: "123",
        complemento: "",
      });
    });
  });

  it("calls onClose when clicking outside the modal", () => {
    render(
      <Offcanvas isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />
    );

    fireEvent.click(screen.getByTestId("offcanvas-backdrop"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
