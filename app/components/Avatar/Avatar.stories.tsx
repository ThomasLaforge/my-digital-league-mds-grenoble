import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Header: Story = {
  args: {
    variant: "header",
    letter: "T",
  },
};

export const ProfilePrimaryText: Story = {
  args: {
    variant: "profile",
    letter: "A",
    textColor: "primary",
  },
};

export const ProfileDarkText: Story = {
  args: {
    variant: "profile",
    letter: "B",
    textColor: "black",
  },
};
