import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/UserCard";

const mockOnDelete = jest.fn();

describe("UserCard Component", () => {
  const user = {
    nome: "Teste Usuário",
    email: "teste@teste.com",
    endereco: "Rua Exemplo, 123 - Cidade/Estado",
  };

  it("renders user information", () => {
    render(
      <UserCard
        nome={user.nome}
        email={user.email}
        endereco={user.endereco}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(user.nome)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.endereco)).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked", () => {
    render(
      <UserCard
        nome={user.nome}
        email={user.email}
        endereco={user.endereco}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Excluir/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
