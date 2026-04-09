import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Radio from "@/app/components/Radio/Radio";

describe("Radio Component", () => {
  const defaultProps = {
    label: "Option 1",
    name: "test-radio",
    value: "1",
    onChange: vi.fn(),
  };

  it("affiche correctement le label fourni", () => {
    render(<Radio {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("affiche le texte d'aide (helperText) lorsqu'il est présent", () => {
    render(<Radio {...defaultProps} helperText="Texte d'assistance" />);
    expect(screen.getByText("Texte d'assistance")).toBeInTheDocument();
  });

  it("appelle la fonction onChange lors du clic", () => {
    render(<Radio {...defaultProps} />);
    const input = screen.getByRole("radio", { hidden: true });

    fireEvent.click(input);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("est coché lorsque la prop checked est à true", () => {
    render(<Radio {...defaultProps} checked={true} />);
    const input = screen.getByRole("radio", {
      hidden: true,
    }) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("est désactivé lorsque la prop disabled est à true", () => {
    render(<Radio {...defaultProps} disabled={true} />);
    const input = screen.getByRole("radio", {
      hidden: true,
    }) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("applique les attributs HTML name et value correctement", () => {
    render(<Radio {...defaultProps} />);
    const input = screen.getByRole("radio", {
      hidden: true,
    }) as HTMLInputElement;
    expect(input.name).toBe("test-radio");
    expect(input.value).toBe("1");
  });
});
