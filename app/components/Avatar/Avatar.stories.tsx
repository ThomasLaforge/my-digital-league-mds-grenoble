import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Classic: Story = {
  args: {
    letter: "T",
  },
};
