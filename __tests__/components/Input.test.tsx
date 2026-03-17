import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../../app/components/input/Input";

describe("Input Component", () => {
  it("devrait afficher le label et le placeholder correctement", () => {
    render(<Input label="Pseudo" placeholder="Entrez votre pseudo" />);

    expect(screen.getByText("Pseudo")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Entrez votre pseudo")
    ).toBeInTheDocument();
  });

  it("devrait afficher une astérisque si le champ est obligatoire", () => {
    render(<Input label="Pseudo" obligatory={true} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("devrait appeler onChange lorsque la valeur change", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="test-input" />);

    const input = screen.getByPlaceholderText("test-input");
    fireEvent.change(input, { target: { value: "nouveau pseudo" } });

    expect(handleChange).toHaveBeenCalledWith("nouveau pseudo");
  });

  it("devrait afficher un message d'erreur si la prop error est vraie", () => {
    render(<Input error={true} errorMessage="Ce champ est requis" />);

    expect(screen.getByText("Ce champ est requis")).toBeInTheDocument();
  });

  it("ne devrait pas être modifiable si la prop disabled est vraie", () => {
    render(<Input disabled={true} placeholder="test-disabled" />);

    const input = screen.getByPlaceholderText("test-disabled");
    expect(input).toBeDisabled();
  });

  it("devrait utiliser le type passé en paramètre (ex: email)", () => {
    render(<Input type="email" placeholder="email-test" />);

    const input = screen.getByPlaceholderText("email-test");
    expect(input).toHaveAttribute("type", "email");
  });
});
