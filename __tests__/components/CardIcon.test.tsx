import { PlusIcon } from "@/app/components/Icons/Icons";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardIcon from "@/app/components/CardIcon/CardIcon";

const MockIcon = () => <svg data-testid="plus-icon" />;

describe("CardIcon Component", () => {
  it("affiche le titre", () => {
    render(
      <CardIcon
        icon={<MockIcon />}
        titre="Test Label"
        sousTitre="Test sous-titre"
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });
});

describe("CardIcon Component", () => {
  it("affiche le sous-titre", () => {
    render(
      <CardIcon
        icon={<MockIcon />}
        titre="Test Label"
        sousTitre="Test sous-titre"
      />
    );
    expect(screen.getByText("Test sous-titre")).toBeInTheDocument();
  });
});

describe("CardIcon Component", () => {
  it("affiche l'icone", () => {
    render(
      <CardIcon
        icon={<MockIcon />}
        titre="Test Label"
        sousTitre="Test sous-titre"
      />
    );
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });
});

describe("CardIcon Component - Structure", () => {
  it("rend un élément <div>", () => {
    render(
      <CardIcon
        icon={<MockIcon />}
        titre="Test Label"
        sousTitre="Test sous-titre"
      />
    );
    expect(screen.getByText("Test Label").closest("div")).toBeInTheDocument();
  });
});
