import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Pseudo In-game",
    placeholder: "FallenAngel",
    value: "",
    onChange: (value) => console.log(value),
    disabled: false,
    type: "text",
  },
};

export const Email: Story = {
  args: {
    label: "Email Address",
    placeholder: "mds@My-digital-school.org",
    value: "",
    onChange: (value) => console.log(value),
    disabled: false,
    type: "email",
  },
};

export const Error: Story = {
  args: {
    label: "Date de début",
    placeholder: "",
    value: "",
    onChange: (value) => console.log(value),
    disabled: false,
    type: "Date",
    obligatory: true,
    error: true,
    errorMessage: "This field is required",
  },
};
