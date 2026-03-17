import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Minicard from "./Minicard";

const meta = {
  title: "Components/MinicardComponent",
  component: Minicard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Minicard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is a card title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
